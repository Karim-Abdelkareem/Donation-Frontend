import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "react-hot-toast";
import { FaCheck, FaEye, FaTrash, FaRegEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router";
import axios from "axios";

// Add Spinner component
const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
  </div>
);

export default function DonatesDashboard() {
  const [donates, setDonates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const donatesPerPage = 10;

  // Fetch donates
  const fetchDonates = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/donate/admin`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.data.status === "success") {
        setDonates(response.data.data.campaigns);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch donate requests"
      );
      toast.error("Failed to fetch donate requests");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_HOST}/api/donate/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 204) {
        setDonates(donates.filter((donate) => donate._id !== id));
        toast.success("تم حذف الطلب بنجاح");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "فشل حذف الطلب");
    }
  };

  const handleActivate = async (id) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_HOST}/api/donate/${id}/activate`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.data.status === "success") {
        setDonates(
          donates.map((donate) =>
            donate._id === id ? { ...donate, status: "active" } : donate
          )
        );
        toast.success("تم تفعيل الطلب بنجاح");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "فشل تفعيل الطلب");
    }
  };

  const handleDeactivate = async (id) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_HOST}/api/donate/${id}/deactivate`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.data.status === "success") {
        setDonates(
          donates.map((donate) =>
            donate._id === id ? { ...donate, status: "inactive" } : donate
          )
        );
        toast.success("تم تعليق الطلب بنجاح");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "فشل تعليق الطلب");
    }
  };

  useEffect(() => {
    fetchDonates();
  }, []);

  // Get filtered donates
  const getFilteredDonates = () => {
    switch (filter) {
      case "active":
        return donates.filter((donate) => donate.status === "active");
      case "inactive":
        return donates.filter((donate) => donate.status === "inactive");
      default:
        return donates;
    }
  };

  // Get paginated donates
  const getPaginatedDonates = () => {
    const filteredDonates = getFilteredDonates();
    const indexOfLastDonate = currentPage * donatesPerPage;
    const indexOfFirstDonate = indexOfLastDonate - donatesPerPage;
    return filteredDonates?.slice(indexOfFirstDonate, indexOfLastDonate);
  };

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-600 mb-6">طلبات التبرع</h1>

      {/* Filter buttons */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md ${
            filter === "all"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          الكل
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-md ${
            filter === "active"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          المفعلة
        </button>
        <button
          onClick={() => setFilter("inactive")}
          className={`px-4 py-2 rounded-md ${
            filter === "inactive"
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          المعلقة
        </button>
      </div>

      {/* Donates table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2 text-right">#</th>
              <th className="px-4 py-2 text-right">image</th>
              <th className="px-4 py-2 text-right">العنوان</th>
              <th className="px-4 py-2 text-right">الوصف</th>
              <th className="px-4 py-2 text-right">رقم الهاتف</th>
              <th className="px-4 py-2 text-right">الحالة</th>
              <th className="px-4 py-2 text-right">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedDonates()?.map((donate, index) => (
              <tr key={donate._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    className="rounded w-10 h-10 object-cover"
                    src={donate.proofImages[0]}
                    alt=""
                  />
                </td>
                <td className="px-4 py-2">{donate.title}</td>
                <td className="px-4 py-2">
                  <p className="line-clamp-3 w-72">{donate.description}</p>
                </td>
                <td className="px-4 py-2">{donate.phone}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      donate.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {donate.status === "active" ? "مفعل" : "معلق"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    {donate.status === "inactive" ? (
                      <button
                        onClick={() => handleActivate(donate._id)}
                        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                        title="تفعيل"
                      >
                        <FaCheck className="text-sm" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeactivate(donate._id)}
                        className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                        title="تعليق"
                      >
                        <RxCross2 className="text-sm" />
                      </button>
                    )}
                    <Link
                      to={`/edit-donate/${donate._id}`}
                      className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
                      title="تعديل"
                    >
                      <FaRegEdit className="text-sm" />
                    </Link>
                    <button
                      onClick={() =>
                        window.open(`/donate/${donate._id}`, "_blank")
                      }
                      className="bg-gray-100 text-gray-700 p-2 rounded-md hover:bg-gray-200"
                      title="عرض"
                    >
                      <FaEye className="text-sm" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
                          handleDelete(donate._id);
                        }
                      }}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                      title="حذف"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden space-y-4">
        {getPaginatedDonates()?.map((donate, index) => (
          <div
            key={donate._id}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-indigo-600">{donate.title}</h2>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  donate.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {donate.status === "active" ? "مفعل" : "معلق"}
              </span>
            </div>
            <div className="flex flex-col gap-4 items-center mb-2">
              <img
                src={donate.proofImages[0]}
                alt=""
                className="object-cover rounded"
              />
              <p className="text-gray-700 line-clamp-3">{donate.description}</p>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              رقم الهاتف: {donate.phone}
            </div>
            <div className="flex gap-2 flex-wrap justify-start">
              {donate.status === "inactive" ? (
                <button
                  onClick={() => handleActivate(donate._id)}
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                  title="تفعيل"
                >
                  <FaCheck className="text-sm" />
                </button>
              ) : (
                <button
                  onClick={() => handleDeactivate(donate._id)}
                  className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                  title="تعليق"
                >
                  <RxCross2 className="text-sm" />
                </button>
              )}
              <Link
                to={`/edit-donate/${donate._id}`}
                className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700"
                title="تعديل"
              >
                <FaRegEdit className="text-sm" />
              </Link>
              <button
                onClick={() => window.open(`/donate/${donate._id}`, "_blank")}
                className="bg-gray-100 text-gray-700 p-2 rounded-md hover:bg-gray-200"
                title="عرض"
              >
                <FaEye className="text-sm" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
                    handleDelete(donate._id);
                  }
                }}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                title="حذف"
              >
                <FaTrash className="text-sm" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {getFilteredDonates().length === 0 && (
        <div className="text-center py-8 text-gray-500">
          لا توجد طلبات{" "}
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
        <div className="flex items-center text-xs lg:text-base px-4">
          صفحة {currentPage} من{" "}
          {Math.ceil(getFilteredDonates().length / donatesPerPage)}
        </div>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(getFilteredDonates().length / donatesPerPage)
              )
            )
          }
          disabled={
            currentPage ===
            Math.ceil(getFilteredDonates().length / donatesPerPage)
          }
          className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          التالي
        </button>
      </div>
    </div>
  );
}
