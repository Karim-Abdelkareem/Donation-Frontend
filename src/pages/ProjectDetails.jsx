import React, { useEffect, useState } from "react";
import { VscChevronLeft } from "react-icons/vsc";
import { Link, useParams } from "react-router";
import { api } from "../services/api";

export default function ProjectDetails() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch campaign details from API
  async function fetchCampaignDetails() {
    try {
      setLoading(true);
      const response = await api.get(`api/donation/${id}`);
      console.log(response.data);

      if (response.data.status === "success") {
        setCampaign(response.data.data.campaign);
      } else {
        setError("Failed to fetch campaign details");
      }
    } catch (error) {
      setError(
        error.message || "An error occurred while fetching campaign details"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCampaignDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="mt-20 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 flex justify-center items-center min-h-[60vh]">
        <div className="text-red-500 text-center">
          <p className="text-xl font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="mt-20 flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">No campaign found</p>
      </div>
    );
  }

  // Add Image Modal Component
  const ImageModal = ({ image, onClose }) => {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000c9] bg-opacity-75"
        onClick={onClose}
      >
        <div className="relative max-w-[90vw] max-h-[90vh]">
          <button
            className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            onClick={onClose}
          >
            ×
          </button>
          <img
            src={image}
            alt="Full size"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="mt-20">
      <div className="mx-24 text-xs flex gap-1 items-center font-medium">
        <Link to="/">الرئيسية</Link>
        <span className="text-gray-400">
          <VscChevronLeft className="text-[16px]" />
        </span>
        <p>فرص التبرع</p>
        <span className="text-gray-400">
          <VscChevronLeft className="text-[16px]" />
        </span>
        <Link to="/projects">مشاريع</Link>
        <span className="text-gray-400">
          <VscChevronLeft className="text-[16px]" />
        </span>
        <p className="text-gray-400">{campaign.title}</p>
      </div>
      {/* Add your campaign details content here */}
      <div className="bg-gray-50 mt-10 py-16">
        <div className="flex flex-col mx-auto space-y-3 w-[50%] p-4 bg-white border border-gray-300 shadow-md hover:shadow-lg rounded-xl">
          <div className="relative">
            <img
              loading="lazy"
              className="rounded-md w-full h-72 mt-4 cursor-pointer"
              src={campaign.proofImages[0]}
              onClick={() => setSelectedImage(campaign.proofImages[0])}
              alt={campaign.title}
            />
            <div className="flex my-3 gap-2">
              {campaign.proofImages &&
                campaign.proofImages.map((img, i) => {
                  return (
                    <img
                      key={i}
                      loading="lazy"
                      className="w-20 h-16 rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                      src={img}
                      onClick={() => setSelectedImage(img)}
                      alt={`Image ${i + 1}`}
                    />
                  );
                })}
            </div>
          </div>
          <div className="flex gap-3">
            <div
              className={`${
                campaign.status === "active"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-red-100 text-red-800 border-red-200"
              } px-4 py-2 rounded-md border text-xs font-medium`}
            >
              {campaign.status === "active" ? "حملة نشطة" : "حملة معلقة"}
            </div>
            <div className="border border-gray-100 bg-gray-50 text-black/80 px-4 py-2 rounded-md text-xs font-medium">
              <p>المشاريع العامة</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-extrabold">{campaign.title}</p>
            <div className="flex gap-x-2 items-center">
              <p className="font-bold">رقم الحالة:</p>
              <p className="text-sm font-medium text-gray-500">
                {campaign.donationCode}
              </p>
            </div>
          </div>
          <div className="flex bg-gray-100 rounded-md p-2 text-sm font-medium">
            {campaign.description}
          </div>
          <div className="flex bg-gray-100 rounded-md p-4 gap-x-20 items-center">
            <div className="flex flex-col space-y-2">
              <p className="text-[#009174] font-semibold">تم جمع</p>
              <p className="text-sm font-medium">
                {campaign.currentAmount} <span>ج.م</span>
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-[#009174] font-semibold">المبلغ المتبقي</p>
              <p className="text-sm font-medium">
                {campaign.goalAmount} <span>ج.م</span>
              </p>
            </div>
          </div>
          <div className="flex bg-gray-100 rounded-md p-4 gap-x-20 items-center">
            <div className="flex flex-col space-y-2">
              <p className="text-[#009174] font-semibold">عدد المستفيدين</p>
              <p className="text-sm font-medium">6 مستفيد</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-[#009174] font-semibold">نوع المستفيد</p>
              <p className="text-sm font-medium">المواطنون</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-[#009174] font-semibold">التصنيف</p>
              <p className="text-sm font-medium">{campaign.category}</p>
            </div>
          </div>
          <hr className="text-gray-300" />
          <div className="flex gap-2 items-center text-sm font-medium text-gray-500">
            <p>تاريخ بداية الحملة:</p>
            <p>
              {new Date(campaign.createdAt).toLocaleDateString("ar-EG", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
