import React, { useEffect, useState } from "react";
import { VscChevronLeft } from "react-icons/vsc";
import { Link, useParams } from "react-router";
import { api } from "../services/api";

export default function DonateDetails() {
  const { id } = useParams();
  const [donate, setDonate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch donate details
  async function fetchDonateDetails() {
    try {
      setLoading(true);
      const response = await api.get(`/api/donate/${id}`);

      if (response.data.status === "success") {
        console.log(response);

        setDonate(response.data.data.campaign);
      } else {
        setError("Failed to fetch donate details");
      }
    } catch (error) {
      setError(
        error.message || "An error occurred while fetching donate details"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDonateDetails();
  }, [id]);

  // Image Modal Component
  const ImageModal = ({ image, onClose }) => {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 bg-opacity-75"
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

  if (!donate) {
    return (
      <div className="mt-20 flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">لم يتم العثور على الطلب</p>
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
        <Link
          to="/donations"
          className="hover:text-indigo-600 transition-colors"
        >
          التبرعات
        </Link>
        <span className="text-gray-400">
          <VscChevronLeft className="text-[16px]" />
        </span>
        <p className="text-gray-400">{donate.title}</p>
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
                src={donate.proofImages[0]}
                onClick={() => setSelectedImage(donate.proofImages[0])}
                alt={donate.title}
              />
              <div className="grid grid-cols-4 gap-2 mt-4">
                {donate.proofImages?.map((img, i) => (
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
                donate.status === "active"
                  ? "bg-indigo-100 text-indigo-800 border-indigo-200"
                  : "bg-red-100 text-red-800 border-red-200"
              } px-4 py-2 rounded-md border text-xs font-medium w-fit`}
            >
              {donate.status === "active" ? "طلب نشط" : "طلب معلق"}
            </div>

            {/* Title and Basic Info */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {donate.title}
              </h1>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-bold text-gray-900">رقم الطلب:</p>
                  <p className="text-sm font-medium text-gray-600">
                    {donate.donateCode}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-gray-900">رقم التواصل:</p>
                  <p className="font-medium text-indigo-600 dir-ltr">
                    {donate.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <h2 className="text-lg font-semibold text-indigo-600">الوصف</h2>
              <p className="text-gray-700 leading-relaxed ">
                {donate.description}
              </p>
            </div>

            {/* Date Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex gap-2 items-center text-sm font-medium text-gray-600">
                <p>تاريخ إنشاء الطلب:</p>
                <p>
                  {new Date(donate.createdAt).toLocaleDateString("ar-EG", {
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
