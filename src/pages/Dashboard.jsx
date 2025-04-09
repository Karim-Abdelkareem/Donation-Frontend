import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "react-hot-toast";
import { Link } from "react-router";
import { FaCheck, FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [filter, setFilter] = useState("all"); // Add filter state
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 20;

  // Fetch campaigns
  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(
        "https://donations-backend-ten.vercel.app/api/donation/admin",
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

  // Delete campaign
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://donations-backend-ten.vercel.app/api/donation/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);

      if (response.status === 204) {
        setCampaigns(campaigns.filter((campaign) => campaign._id !== id));
        toast.success("تم حذف الحملة بنجاح");
        fetchCampaigns();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "حذف الحملة فشل");
    }
  };

  //Activate campaign
  const handleActivate = async (id) => {
    try {
      const response = await axios.patch(
        `https://donations-backend-ten.vercel.app/api/donation/${id}/activate`,
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
        toast.success("تمت التفعيل بنجاح");
        fetchCampaigns();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "فشل في تفعيل الحملة");
    }
  };

  //Deactivate campaign
  const handleDeactivate = async (id) => {
    try {
      const response = await axios.patch(
        `https://donations-backend-ten.vercel.app/api/donation/${id}/deactivate`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);

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
      console.log(err);

      toast.error(err.response?.data?.message || "فشل في تعطيل الحملة");
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Get filtered campaigns
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

  // Get paginated campaigns
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-emerald-700">حملات التبرع</h1>
        <Link
          to="/services"
          className="bg-emerald-700 text-white px-4 py-2 rounded-md hover:bg-emerald-800"
        >
          إنشاء حملة جديدة
        </Link>
      </div>

      {/* Add Filter Bar */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => {
            setFilter("all");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-md ${
            filter === "all"
              ? "bg-emerald-700 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          جميع الحملات
        </button>
        <button
          onClick={() => {
            setFilter("active");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-md ${
            filter === "active"
              ? "bg-emerald-700 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          الحملات النشطة
        </button>
        <button
          onClick={() => {
            setFilter("inactive");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-md ${
            filter === "inactive"
              ? "bg-emerald-700 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          الحملات المعلقة
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-emerald-700 text-white">
            <tr>
              <th className="px-4 py-2 text-right">#</th>
              <th className="py-3 px-4 text-right"></th>
              <th className="py-3 px-4 text-right">العنوان</th>
              <th className="py-3 px-4 text-right">التصنيف</th>
              <th className="py-3 px-4 text-right">المبلغ المستهدف</th>
              <th className="py-3 px-4 text-right">المبلغ الحالي</th>
              <th className="py-3 px-4 text-right">الحالة</th>
              <th className="py-3 px-4 text-right">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedCampaigns().map((campaign, i) => (
              <React.Fragment key={campaign._id}>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">{i + 1}</td>
                  <td className="py-4 px-4">
                    <img
                      className="w-16 h-16 rounded-md"
                      src={campaign.proofImages[0]}
                      alt=""
                    />
                  </td>
                  <td className="py-4 px-4">{campaign.title}</td>
                  <td className="py-4 px-4">{campaign.category}</td>
                  <td className="py-4 px-4">{campaign.goalAmount} ج.م</td>
                  <td className="py-4 px-4">{campaign.currentAmount} ج.م</td>
                  <td className="py-4 px-4">
                    <div
                      className={`${
                        campaign.status === "active"
                          ? "bg-green-500"
                          : "bg-red-600"
                      } w-fit p-2 font-medium text-xs rounded-md text-white`}
                    >
                      {campaign.status === "active" ? "نشطة" : "معلقة"}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/edit-campaign/${campaign._id}`}
                        className="bg-emerald-600 text-white p-2 rounded-md hover:bg-emerald-700"
                      >
                        <FaRegEdit className="text-xl" />
                      </Link>
                      <button
                        onClick={() => setSelectedCampaignId(campaign._id)}
                        className="bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                      {campaign.status === "active" ? (
                        <button
                          onClick={() => {
                            handleDeactivate(campaign._id);
                          }}
                          className="bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600"
                        >
                          <RxCross2 />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            handleActivate(campaign._id);
                          }}
                          className="bg-green-500 text-white py-2 px-3 rounded-md hover:bg-green-600"
                        >
                          <FaCheck />
                        </button>
                      )}
                      <button className="text-black py-2 px-3 rounded-md bg-gray-200 hover:bg-gray-300">
                        <Link to={`/projects/${campaign._id}`}>
                          <FaEye />
                        </Link>
                      </button>
                    </div>
                  </td>
                </tr>
                {selectedCampaignId === campaign._id && (
                  <Dialog
                    campaign={campaign}
                    setOpen={(isOpen) => {
                      if (!isOpen) setSelectedCampaignId(null);
                    }}
                    onDelete={handleDelete}
                  />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          السابق
        </button>
        <div className="flex items-center px-4">
          صفحة {currentPage} من {totalPages}
        </div>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          التالي
        </button>
      </div>

      {getFilteredCampaigns().length === 0 && (
        <div className="text-center py-8 text-gray-500">
          لا توجد حملات{" "}
          {filter === "active" ? "نشطة" : filter === "inactive" ? "معلقة" : ""}
        </div>
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
        className="fixed inset-0 bg-[#6a728224] opacity-50"
        onClick={() => setOpen(false)}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-60">
        <h2 className="text-2xl font-bold mb-4">تأكيد الحذف</h2>
        <p className="mb-6">هل أنت متأكد أنك تريد حذف هذه الحملة؟</p>
        <div className="flex justify-end gap-6">
          <button
            onClick={() => setOpen(false)}
            className="bg-gray-300 cursor-pointer text-gray-700 px-4 py-2 rounded-md mr-2"
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
