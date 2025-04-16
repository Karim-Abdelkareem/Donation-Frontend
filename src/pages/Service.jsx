import React, { useState, useRef, useCallback, useEffect } from "react";
import { api } from "../services/api";
import uploadToCloudinary from "../utils/cloudinary";
import { toast } from "react-hot-toast";
import axios from "axios";

const categories = [
  "مساعدات إنسانية",
  "مساعدات طبية",
  "مساعدات تعليمية",
  "مساعدات غذائية",
  "بناء مساجد",
  "حفر آبار",
];

export default function Service() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    category: "",
    proofImages: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState([]);
  const fileInputRef = useRef(null);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Selection
  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      proofImages: [...prev.proofImages, ...files],
    }));

    // Create preview URLs
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPreview((prev) => [...prev, ...imageUrls]);

    // Clear input field to allow re-selection of the same files
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  // Cleanup Object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      preview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [preview]);

  // Remove selected image
  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      proofImages: prev.proofImages.filter(
        (_, index) => index !== indexToRemove
      ),
    }));

    setPreview((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Upload images to Cloudinary first
      const imageUrls = await Promise.all(
        formData.proofImages.map(async (image) => {
          const cloudinaryUrl = await uploadToCloudinary(image);
          return cloudinaryUrl;
        })
      );

      // Create form data with Cloudinary URLs
      const campaignData = {
        title: formData.title,
        description: formData.description,
        goalAmount: formData.goalAmount,
        category: formData.category,
        proofImages: imageUrls,
      };

      const response = await axios.post(`${import.meta.env.VITE_HOST}/api/donation`, campaignData,{
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        }
      });

      if (response.data.status === "success") {
        // Show success toast
        toast.success("تم إنشاء الحملة بنجاح بأنتظار موافقة المشرفين!", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#4f46e5", // indigo-600
            color: "#fff",
          },
        });

        // Reset form and previews
        setFormData({
          title: "",
          description: "",
          goalAmount: "",
          category: "",
          proofImages: [],
        });
        setPreview([]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "حدث خطأ ما", {
        duration: 3000,
        position: "top-center",
      });
      setError(err.response?.data?.message || "حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        إنشاء حملة تبرع جديدة
      </h1>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            عنوان الحملة
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            وصف الحملة
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            المبلغ المستهدف
          </label>
          <input
            type="number"
            name="goalAmount"
            value={formData.goalAmount}
            onChange={handleChange}
            required
            min="0"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            التصنيف
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">اختر التصنيف</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            صور إثباتية
          </label>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {preview.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {preview.map((url, index) => (
                <div key={index} className="relative">
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? "جاري الإنشاء..." : "إنشاء الحملة"}
        </button>
      </form>
    </div>
  );
}
