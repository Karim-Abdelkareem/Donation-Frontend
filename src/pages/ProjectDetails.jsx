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

  // Fetch campaign details
  async function fetchCampaignDetails() {
    try {
      setLoading(true);
      const response = await api.get(`/api/donation/${id}`);

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

  // Image Modal Component
  const ImageModal = ({ image, onClose }) => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
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

  if (loading) {
    return (
      <div className="mt-20 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 flex justify-center items-center min-h-[60vh]">
        <div className="text-red-500 text-center">
          <p className="text-xl font-bold">خطأ</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="mt-20 flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">لم يتم العثور على الحملة</p>
      </div>
    );
  }

  return (
    <div className="mt-20">
      {/* Breadcrumb Navigation */}
      <div className="mx-24 text-xs flex gap-1 items-center font-medium">
        <Link to="/" className="hover:text-indigo-600 transition-colors">
          الرئيسية
        </Link>
        <span className="text-gray-400">
          <VscChevronLeft className="text-[16px]" />
        </span>
        <p>فرص التبرع</p>
        <span className="text-gray-400">
          <VscChevronLeft className="text-[16px]" />
        </span>
        <Link
          to="/projects"
          className="hover:text-indigo-600 transition-colors"
        >
          مشاريع
        </Link>
        <span className="text-gray-400">
          <VscChevronLeft className="text-[16px]" />
        </span>
        <p className="text-gray-400">{campaign.title}</p>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 mt-10 py-16">
        <div className="mx-auto w-[90%] grid grid-cols-12 gap-8">
          {/* Left Side - Images */}
          <div className="col-span-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                loading="lazy"
                className="rounded-md w-full h-96 object-cover cursor-pointer"
                src={campaign.proofImages[0]}
                onClick={() => setSelectedImage(campaign.proofImages[0])}
                alt={campaign.title}
              />
              <div className="grid grid-cols-4 gap-2 mt-4">
                {campaign.proofImages?.map((img, i) => (
                  <img
                    key={i}
                    loading="lazy"
                    className="w-full h-20 rounded-md cursor-pointer object-cover hover:opacity-80 transition-opacity"
                    src={img}
                    onClick={() => setSelectedImage(img)}
                    alt={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="col-span-6 space-y-6">
            {/* Status Badge */}
            <div
              className={`${
                campaign.status === "active"
                  ? "bg-indigo-100 text-indigo-800 border-indigo-200"
                  : "bg-red-100 text-red-800 border-red-200"
              } px-4 py-2 rounded-md border text-xs font-medium w-fit`}
            >
              {campaign.status === "active" ? "حملة نشطة" : "حملة معلقة"}
            </div>

            {/* Title and Basic Info */}
            <div className="bg-indigo-200/50 border border-indigo-300/50 text-indigo-900/800 p-6 rounded-lg shadow-md space-y-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {campaign.title}
              </h1>
              <div className="flex gap-x-2 items-center">
                <p className="font-bold text-gray-900">رقم الحملة:</p>
                <p className="text-sm font-medium text-gray-600">
                  {campaign.donationCode}
                </p>
              </div>
            </div>

            {/* Amounts */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <h2 className="text-lg font-semibold text-indigo-600">المبالغ</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-bold text-gray-900">تم جمع:</p>
                  <p className="text-sm font-medium text-gray-900">
                    {campaign.currentAmount}{" "}
                    <span className="text-gray-600">ج.م</span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-gray-900">المبلغ المستهدف:</p>
                  <p className="text-sm font-medium text-gray-900">
                    {campaign.goalAmount}{" "}
                    <span className="text-gray-600">ج.م</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-indigo-200/50 border border-indigo-300/50 text-indigo-900/800 p-6 rounded-lg shadow-md space-y-4">
              <h2 className="text-lg font-semibold text-indigo-600">الوصف</h2>
              <p className="text-gray-700 leading-relaxed">
                {campaign.description}
              </p>
            </div>

            {/* Additional Info */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <h2 className="text-lg font-semibold text-indigo-600">
                معلومات إضافية
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="font-bold text-gray-900">عدد المستفيدين:</p>
                  <p className="text-sm font-medium text-gray-900">6 مستفيد</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-gray-900">نوع المستفيد:</p>
                  <p className="text-sm font-medium text-gray-900">المواطنون</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-gray-900">التصنيف:</p>
                  <p className="text-sm font-medium text-gray-900">
                    {campaign.category}
                  </p>
                </div>
              </div>
            </div>

            {/* Date Information */}
            <div className="bg-indigo-200/50 border border-indigo-300/50 text-indigo-900/800 p-6 rounded-lg shadow-md space-y-4">
              <div className="flex gap-2 items-center text-sm font-medium text-gray-600">
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
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
