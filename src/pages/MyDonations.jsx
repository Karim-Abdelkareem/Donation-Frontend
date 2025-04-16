import axios from "axios";
import React, { useEffect, useState } from "react";
import DonationCard from "../components/DonationCard";
import DonateCard from "../components/DonateCard";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import ConfirmDialog from "../components/ConfirmDialog";

export default function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [donates, setDonates] = useState([]);
  const [loading, setLoading] = useState({ donations: true, donates: true });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const [deleteType, setDeleteType] = useState(null);

  // Add pagination states
  const [currentPage, setCurrentPage] = useState({ donations: 1, donates: 1 });
  const itemsPerPage = 12;

  // Calculate pagination
  const paginateDonations = donations?.slice(
    (currentPage.donations - 1) * itemsPerPage,
    currentPage.donations * itemsPerPage
  );
  const paginateDonates = donates?.slice(
    (currentPage.donates - 1) * itemsPerPage,
    currentPage.donates * itemsPerPage
  );

  async function getDonations() {
    try {
      setLoading((prev) => ({ ...prev, donations: true }));
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/donation/user`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status === "success") {
        setDonations(response.data.data);
        setError(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch donations");
    } finally {
      setLoading((prev) => ({ ...prev, donations: false }));
    }
  }

  async function getDonates() {
    try {
      setLoading((prev) => ({ ...prev, donates: true }));
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/donate/user`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status === "success") {
        setDonates(response.data.data);
        setError(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch donates");
    } finally {
      setLoading((prev) => ({ ...prev, donates: false }));
    }
  }

  async function handleDeleteDonation(id) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_HOST}/api/donation/${id}`,

        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 204) {
        toast.success("تم حذف الحملة بنجاح", {
          duration: 3000,
          position: "top-center",
        });
        setDonations((prev) => prev.filter((donation) => donation._id !== id));
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete donation");
      toast.error(err.response?.data?.message || "Failed to delete donation", {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  async function handleDeleteDonate(id) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_HOST}/api/donate/${id}`,

        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 204) {
        toast.success("تم حذف الحملة بنجاح", {
          duration: 3000,
          position: "top-center",
        });
        setDonates((prev) => prev.filter((donate) => donate._id !== id));
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete donation");
      toast.error(err.response?.data?.message || "Failed to delete donation", {
        duration: 3000,
        position: "top-center",
      });
    }
  }

  useEffect(() => {
    getDonations();
    getDonates();
  }, []);

  if (loading.donations || loading.donates) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-red-500 text-center">
          <p className="text-xl font-bold">خطأ</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!donations?.length && !donates?.length) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">لا توجد تبرعات</p>
      </div>
    );
  }

  // Add Pagination Component
  const Pagination = ({ items, type }) => {
    const pageCount = Math.ceil(items.length / itemsPerPage);
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    return (
      <div className="flex justify-center gap-2 mt-8">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() =>
              setCurrentPage((prev) => ({ ...prev, [type]: page }))
            }
            className={`px-4 py-2 rounded-md ${
              currentPage[type] === page
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ConfirmDialog
        isOpen={open}
        message={"هل أنت متأكد من حذف هذا الطلب؟"}
        onConfirm={() => {
          if (selectedDonationId && deleteType) {
            if (deleteType === "donation") {
              handleDeleteDonation(selectedDonationId);
            } else {
              handleDeleteDonate(selectedDonationId);
            }
            setOpen(false);
            setSelectedDonationId(null);
            setDeleteType(null);
          }
        }}
        onClose={() => {
          setOpen(false);
          setSelectedDonationId(null);
          setDeleteType(null);
        }}
      />

      <h1 className="text-4xl font-bold text-gray-900 mb-8">طلبات التبرع</h1>

      {donations?.length > 0 && (
        <>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            حملات التبرع
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginateDonations.map((donation) => (
              <div key={donation._id} className="relative group">
                <button
                  onClick={() => {
                    setSelectedDonationId(donation._id);
                    setDeleteType("donation");
                    setOpen(true);
                  }}
                  className="absolute cursor-pointer z-20 top-2 right-5 p-2 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-200"
                >
                  <FaTrash size={14} />
                </button>

                <div
                  className={`absolute z-10 top-8 left-8 px-3 py-1 rounded-full text-xs font-medium ${
                    donation.status === "active"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {donation.status === "active" ? "نشط" : "معلق"}
                </div>
                <DonationCard campaign={donation} />
              </div>
            ))}
          </div>
          {donations.length > itemsPerPage && (
            <Pagination items={donations} type="donations" />
          )}
        </>
      )}

      {donates?.length > 0 && (
        <>
          <hr
            className={`${
              donations.length === 0 && "hidden"
            } my-20 text-gray-300`}
          />
          <h3 className="text-2xl font-bold text-gray-900 mb-8">التبرعات</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginateDonates.map((donate) => (
              <div key={donate._id} className="relative group">
                <button
                  onClick={() => {
                    setSelectedDonationId(donate._id);
                    setDeleteType("donate");
                    setOpen(true);
                  }}
                  className="absolute cursor-pointer z-20 top-2 right-5 p-2 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-200"
                >
                  <FaTrash size={14} />
                </button>
                <div
                  className={`absolute cursor-pointer z-10 top-6 left-5 px-3 py-1 rounded-full text-xs font-medium ${
                    donate.status === "active"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {donate.status === "active" ? "نشط" : "معلق"}
                </div>
                <DonateCard campaign={donate} />
              </div>
            ))}
          </div>
          {donates.length > itemsPerPage && (
            <Pagination items={donates} type="donates" />
          )}
        </>
      )}
    </div>
  );
}
