import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router";
import { FaCheck, FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

// Add Spinner component at the top of the file after imports
const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
  </div>
);

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 20;

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/donation/admin`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.data.status === "success") {
        setCampaigns(response.data.data.campaigns);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch campaigns");
      toast.error("Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_HOST}/api/donation/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 204) {
        setCampaigns(campaigns.filter((campaign) => campaign._id !== id));
        toast.success("تم حذف الحملة بنجاح");
        fetchCampaigns();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "حذف الحملة فشل");
    }
  };

  const handleActivate = async (id) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_HOST}/api/donation/${id}/activate`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.data.status === "success") {
        const updatedCampaigns = campaigns.map((campaign) =>
          campaign._id === id
            ? { ...campaign, isActive: !campaign.isActive }
            : campaign
        );
        setCampaigns(updatedCampaigns);
        toast.success("تم التفعيل بنجاح", {
          style: {
            background: "#4f46e5",
            color: "#fff",
          },
        });
        fetchCampaigns();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "فشل في تفعيل الحملة");
    }
  };

  const handleDeactivate = async (id) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_HOST}/api/donation/${id}/deactivate`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.data.status === "success") {
        const updatedCampaigns = campaigns.map((campaign) =>
          campaign._id === id
            ? { ...campaign, isActive: !campaign.isActive }
            : campaign
        );
        setCampaigns(updatedCampaigns);
        toast.error("تم الغاء التفعيل بنجاح");
        fetchCampaigns();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "فشل في تعطيل الحملة");
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const getFilteredCampaigns = () => {
    switch (filter) {
      case "active":
        return campaigns.filter((campaign) => campaign.status === "active");
      case "inactive":
        return campaigns.filter((campaign) => campaign.status !== "active");
      default:
        return campaigns;
    }
  };

  const getPaginatedCampaigns = () => {
    const filteredCampaigns = getFilteredCampaigns();
    const indexOfLastCampaign = currentPage * campaignsPerPage;
    const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
    return filteredCampaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);
  };

  const totalPages = Math.ceil(
    getFilteredCampaigns().length / campaignsPerPage
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-600">حملات التبرع</h1>
      </div>

      <div className="mb-6 flex gap-4">
        <button
          onClick={() => {
            setFilter("all");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-md ${
            filter === "all"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          الكل
        </button>
        <button
          onClick={() => {
            setFilter("active");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-md ${
            filter === "active"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          المفعلة
        </button>
        <button
          onClick={() => {
            setFilter("inactive");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-md ${
            filter === "inactive"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          المعلقة
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="hidden lg:table min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2 text-right">#</th>
              <th className="px-4 py-2 text-right">الصورة</th>
              <th className="px-4 py-2 text-right">العنوان</th>
              <th className="px-4 py-2 text-right">التصنيف</th>
              <th className="px-4 py-2 text-right">المبلغ المستهدف</th>
              <th className="px-4 py-2 text-right">المبلغ الحالي</th>
              <th className="px-4 py-2 text-right">الحالة</th>
              <th className="px-4 py-2 text-right">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedCampaigns().map((campaign, index) => (
              <tr key={campaign._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    className="w-10 h-10 rounded object-cover"
                    src={campaign.proofImages[0]}
                    alt=""
                  />
                </td>
                <td className="px-4 py-2">{campaign.title}</td>
                <td className="px-4 py-2">{campaign.category}</td>
                <td className="px-4 py-2">{campaign.goalAmount} ج.م</td>
                <td className="px-4 py-2">{campaign.currentAmount} ج.م</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      campaign.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {campaign.status === "active" ? "نشطة" : "معلقة"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    {campaign.status === "active" ? (
                      <button
                        onClick={() => handleDeactivate(campaign._id)}
                        className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                        title="تعليق"
                      >
                        <RxCross2 className="text-sm" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivate(campaign._id)}
                        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                        title="تفعيل"
                      >
                        <FaCheck className="text-sm" />
                      </button>
                    )}
                    <Link
                      to={`/edit-campaign/${campaign._id}`}
                      className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
                      title="تعديل"
                    >
                      <FaRegEdit className="text-sm" />
                    </Link>
                    <button
                      onClick={() => setSelectedCampaignId(campaign._id)}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                      title="حذف"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                    <Link
                      to={`/projects/${campaign._id}`}
                      className="bg-gray-100 text-gray-700 p-2 rounded-md hover:bg-gray-200"
                      title="عرض"
                    >
                      <FaEye className="text-sm" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden space-y-4">
        {getPaginatedCampaigns().map((campaign, index) => (
          <div key={campaign._id} className="bg-white p-4 rounded shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-indigo-600">
                {campaign.title}
              </h2>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  campaign.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {campaign.status === "active" ? "نشطة" : "معلقة"}
              </span>
            </div>

            <img
              src={campaign.proofImages[0]}
              alt="campaign"
              className="w-full h-40 object-cover rounded mb-3"
            />

            <div className="text-sm text-gray-700 space-y-1">
              <p>التصنيف: {campaign.category}</p>
              <p>المبلغ المستهدف: {campaign.goalAmount} ج.م</p>
              <p>المبلغ الحالي: {campaign.currentAmount} ج.م</p>
            </div>

            <div className="flex gap-2 mt-4">
              {campaign.status === "active" ? (
                <button
                  onClick={() => handleDeactivate(campaign._id)}
                  className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                  title="تعليق"
                >
                  <RxCross2 className="text-sm" />
                </button>
              ) : (
                <button
                  onClick={() => handleActivate(campaign._id)}
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                  title="تفعيل"
                >
                  <FaCheck className="text-sm" />
                </button>
              )}
              <Link
                to={`/edit-campaign/${campaign._id}`}
                className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
                title="تعديل"
              >
                <FaRegEdit className="text-sm" />
              </Link>
              <button
                onClick={() => setSelectedCampaignId(campaign._id)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                title="حذف"
              >
                <FaTrash className="text-sm" />
              </button>
              <Link
                to={`/projects/${campaign._id}`}
                className="bg-gray-100 text-gray-700 p-2 rounded-md hover:bg-gray-200"
                title="عرض"
              >
                <FaEye className="text-sm" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {getFilteredCampaigns().length === 0 && (
        <div className="text-center py-8 text-gray-500">
          لا توجد حملات{" "}
          {filter === "active" ? "نشطة" : filter === "inactive" ? "معلقة" : ""}
        </div>
      )}

      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          السابق
        </button>
        <div className="flex text-xs lg:text-base items-center px-4">
          صفحة {currentPage} من{" "}
          {Math.ceil(getFilteredCampaigns().length / campaignsPerPage)}
        </div>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(getFilteredCampaigns().length / campaignsPerPage)
              )
            )
          }
          disabled={
            currentPage ===
            Math.ceil(getFilteredCampaigns().length / campaignsPerPage)
          }
          className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          التالي
        </button>
      </div>

      {selectedCampaignId && (
        <Dialog
          campaign={campaigns.find((c) => c._id === selectedCampaignId)}
          setOpen={(isOpen) => {
            if (!isOpen) setSelectedCampaignId(null);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

function Dialog({ campaign, setOpen, onDelete }) {
  const handleConfirmDelete = async () => {
    await onDelete(campaign._id);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-50"
        onClick={() => setOpen(false)}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-60">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">تأكيد الحذف</h2>
        <p className="mb-6">هل أنت متأكد أنك تريد حذف هذه الحملة؟</p>
        <div className="flex justify-end gap-6">
          <button
            onClick={() => setOpen(false)}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            إلغاء
          </button>
          <button
            onClick={handleConfirmDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * مكون لوحة التحكم
 *
 * لوحة تحكم المشرف الرئيسية لإدارة حملات التبرع
 * المميزات:
 * - عرض قائمة بجميع الحملات مع التصفح
 * - تصفية الحملات حسب الحالة (نشط/غير نشط)
 * - الإجراءات: تفعيل/تعطيل، تعديل، حذف الحملات
 * - حالات التحميل ومعالجة الأخطاء
 */
