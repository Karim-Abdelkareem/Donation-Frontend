import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "react-hot-toast";
import { format, addDays, differenceInDays } from "date-fns";
import { ar } from "date-fns/locale";
import AiChat from "../components/AiChat";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const ADDICTION_CATEGORIES = [
  { id: "smoking", label: "التدخين", defaultTarget: 30 },
  { id: "alcohol", label: "الكحول", defaultTarget: 90 },
  { id: "drugs", label: "المخدرات", defaultTarget: 90 },
  { id: "gambling", label: "القمار", defaultTarget: 60 },
  { id: "social_media", label: "وسائل التواصل", defaultTarget: 30 },
  { id: "other", label: "أخرى", defaultTarget: 30 },
];

const generateCalendarDays = (checkedDays) => {
  const calendarDays = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = addDays(today, -i);
    const isChecked = checkedDays?.some(
      (checkedDay) =>
        format(new Date(checkedDay), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd")
    );
    calendarDays.push({ date, isChecked });
  }

  return calendarDays;
};

export default function AddictionTracker() {
  const [addictions, setAddictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showRemoveForm, setShowRemoveForm] = useState(false);
  const [notes, setNotes] = useState("");
  const { user, isAuthenticated } = useAuth();

  // Fetch user's progress
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_HOST}/api/addiction/progress`,
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.status === "success") {
          setAddictions(response.data.data.addictions);
          if (response.data.data.addictions.length > 0) {
            setSelectedCategory(response.data.data.addictions[0].category);
            setNotes(response.data.data.addictions[0].notes || "");
          }
        }
      } catch (error) {
        console.log(error);

        toast.error("فشل في جلب البيانات");
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) {
      fetchProgress();
    } else {
      setLoading(false);
    }
  }, [user?._id, isAuthenticated]);

  // Handle daily check-in
  const handleCheckIn = async (category) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/addiction/checkin`,
        { category },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.data.status === "success") {
        setAddictions(response.data.data.addictions);

        // Check if achievement was unlocked
        if (response.data.achievementUnlocked) {
          toast.success("مبروك! لقد وصلت إلى هدفك!");
        } else {
          toast.success("تم تسجيل اليوم بنجاح!");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل في تسجيل اليوم");
    }
  };

  // Add new addiction category
  const handleAddAddiction = async (category) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/addiction/add`,
        { category },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.data.status === "success") {
        setAddictions(response.data.data.addictions);
        setSelectedCategory(category);
        setShowAddForm(false);
        toast.success("تمت إضافة النوع بنجاح!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل في إضافة نوع الإدمان");
    }
  };

  // Remove addiction category
  const handleRemoveAddiction = async (category) => {
    if (
      window.confirm(
        `هل أنت متأكد من إزالة ${
          ADDICTION_CATEGORIES.find((c) => c.id === category)?.label
        }؟`
      )
    ) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_HOST}/api/addiction/remove`,
          {
            data: { category },
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (response.data.status === "success") {
          const updatedAddictions = addictions.filter(
            (a) => a.category !== category
          );
          setAddictions(updatedAddictions);

          // If we removed the currently selected category, select another one if available
          if (selectedCategory === category) {
            if (updatedAddictions.length > 0) {
              setSelectedCategory(updatedAddictions[0].category);
              setNotes(updatedAddictions[0].notes || "");
            } else {
              setSelectedCategory(null);
              setNotes("");
            }
          }

          setShowRemoveForm(false);
          toast.success("تم إزالة النوع بنجاح");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "فشل في إزالة النوع");
      }
    }
  };

  // Reset progress for category
  const handleReset = async (category) => {
    if (window.confirm("هل أنت متأكد من إعادة تعيين التقدم؟")) {
      try {
        const response = await api.post(
          `${import.meta.env.VITE_HOST}/api/addiction/reset`,
          { category },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        if (response.data.status === "success") {
          setAddictions((prev) =>
            prev.map((a) =>
              a.category === category ? response.data.data.addiction : a
            )
          );
          setNotes("");
          toast.success("تم إعادة تعيين التقدم بنجاح");
        }
      } catch (error) {
        toast.error("فشل في إعادة التعيين");
      }
    }
  };

  const getCurrentAddiction = () => {
    return addictions.find((a) => a.category === selectedCategory);
  };

  // Calculate progress percentage
  const calculateProgress = (addiction) => {
    if (!addiction) return 0;
    return Math.min((addiction.streak / addiction.targetDays) * 100, 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <AiChat
        currentAddiction={ADDICTION_CATEGORIES.find(
          (c) => c.id === selectedCategory
        )}
        streak={getCurrentAddiction()?.streak || 0}
      />
      <div className="max-w-4xl mx-auto p-6 mt-20">
        <h1 className="text-3xl font-bold text-center text-emerald-700 mb-8">
          تتبع التعافي
        </h1>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 flex-wrap">
            {addictions.map((addiction) => (
              <button
                key={addiction.category}
                onClick={() => {
                  setSelectedCategory(addiction.category);
                  setNotes(addiction.notes || "");
                }}
                className={`px-4 py-2 rounded-md ${
                  selectedCategory === addiction.category
                    ? "bg-emerald-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {
                  ADDICTION_CATEGORIES.find((c) => c.id === addiction.category)
                    ?.label
                }
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {addictions.length < ADDICTION_CATEGORIES.length && (
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              >
                + إضافة
              </button>
            )}
            {addictions.length > 0 && (
              <button
                onClick={() => setShowRemoveForm(true)}
                className="px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
              >
                - إزالة
              </button>
            )}
          </div>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">إضافة نوع جديد</h2>
              <select
                className="w-full p-2 border rounded mb-4"
                onChange={(e) => handleAddAddiction(e.target.value)}
              >
                <option value="">اختر النوع</option>
                {ADDICTION_CATEGORIES.filter(
                  (cat) => !addictions.some((a) => a.category === cat.id)
                ).map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowAddForm(false)}
                className="w-full bg-gray-200 text-gray-700 p-2 rounded"
              >
                إلغاء
              </button>
            </div>
          </div>
        )}

        {/* Remove Form */}
        {showRemoveForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">إزالة نوع</h2>
              <div className="space-y-2 mb-4">
                {addictions.map((addiction) => (
                  <button
                    key={addiction.category}
                    onClick={() => handleRemoveAddiction(addiction.category)}
                    className="w-full text-left p-3 border rounded hover:bg-red-50 flex justify-between items-center"
                  >
                    <span>
                      {
                        ADDICTION_CATEGORIES.find(
                          (c) => c.id === addiction.category
                        )?.label
                      }
                    </span>
                    <span className="text-red-600">×</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowRemoveForm(false)}
                className="w-full bg-gray-200 text-gray-700 p-2 rounded"
              >
                إلغاء
              </button>
            </div>
          </div>
        )}

        {addictions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-lg">
            <p className="text-gray-500 text-lg mb-4">
              لم يتم إضافة أي نوع من الإدمان بعد
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition-colors"
            >
              + إضافة نوع جديد
            </button>
          </div>
        ) : !selectedCategory ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-lg">
            <p className="text-gray-500 text-lg mb-4">
              الرجاء اختيار نوع الإدمان للبدء
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="text-lg font-semibold">
                    أيام متتالية:{" "}
                    <span className="text-emerald-600">
                      {getCurrentAddiction().streak}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    هدفك: {getCurrentAddiction().targetDays} يوم
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCheckIn(selectedCategory)}
                    disabled={
                      getCurrentAddiction().lastCheckIn &&
                      format(
                        new Date(getCurrentAddiction().lastCheckIn),
                        "yyyy-MM-dd"
                      ) === format(new Date(), "yyyy-MM-dd")
                    }
                    className="bg-emerald-700 text-white px-4 py-2 rounded-md hover:bg-emerald-800 disabled:opacity-50"
                  >
                    تسجيل اليوم
                  </button>
                  <button
                    onClick={() => handleReset(selectedCategory)}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-md hover:bg-red-200"
                  >
                    إعادة تعيين
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>التقدم</span>
                  <span>
                    {Math.round(calculateProgress(getCurrentAddiction()))}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-emerald-600 h-2.5 rounded-full"
                    style={{
                      width: `${calculateProgress(getCurrentAddiction())}%`,
                    }}
                  />
                </div>
              </div>

              {/* Calendar */}
              <div className="grid grid-cols-7 gap-2">
                {generateCalendarDays(getCurrentAddiction().days).map(
                  (day, index) => (
                    <div
                      key={index}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium ${
                        day.isChecked
                          ? "bg-emerald-100 text-emerald-800 border-2 border-emerald-500"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {format(day.date, "d", { locale: ar })}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Achievements and Notes */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">إنجازاتك</h2>
                <div className="space-y-4">
                  {getCurrentAddiction().streak >= 1 && (
                    <div className="flex items-center gap-2 text-emerald-700">
                      <span className="text-2xl">🌟</span>
                      <span>أول يوم من التعافي!</span>
                    </div>
                  )}
                  {getCurrentAddiction().streak >= 7 && (
                    <div className="flex items-center gap-2 text-emerald-700">
                      <span className="text-2xl">🎉</span>
                      <span>أسبوع من التعافي!</span>
                    </div>
                  )}
                  {getCurrentAddiction().streak >= 30 && (
                    <div className="flex items-center gap-2 text-emerald-700">
                      <span className="text-2xl">🏆</span>
                      <span>شهر من التعافي!</span>
                    </div>
                  )}
                  {getCurrentAddiction().streak >= 90 && (
                    <div className="flex items-center gap-2 text-emerald-700">
                      <span className="text-2xl">💪</span>
                      <span>3 أشهر من التعافي!</span>
                    </div>
                  )}
                  {calculateProgress(getCurrentAddiction()) >= 100 && (
                    <div className="flex items-center gap-2 text-emerald-700 font-bold">
                      <span className="text-2xl">🎯</span>
                      <span>وصلت إلى هدفك!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
