import React, { useState, useRef, useCallback, useEffect } from "react";
import { api } from "../services/api";
import uploadToCloudinary from "../utils/cloudinary";
import { toast } from "react-hot-toast";

export default function Donate() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    phone: "",
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

    // Clear input field
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  // Cleanup preview URLs
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
      // Upload images to Cloudinary
      const imageUrls = await Promise.all(
        formData.proofImages.map(async (image) => {
          const cloudinaryUrl = await uploadToCloudinary(image);
          return cloudinaryUrl;
        })
      );

      // Create donation data
      const donationData = {
        title: formData.title,
        description: formData.description,
        phone: formData.phone,
        proofImages: imageUrls,
      };

      const response = await api.post(`${import.meta.env.VITE_HOST}/api/donate`, donationData,{
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      if (response.data.status === "success") {
        toast.success("تم إرسال طلب التبرع بنجاح!", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#6366f1",
            color: "#fff",
          },
        });

        // Reset form
        setFormData({
          title: "",
          description: "",
          phone: "",
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
        تقديم تبرع جديد
      </h1>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            عنوان الطلب
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
            وصف الطلب
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
            رقم الهاتف
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            صور التبرع
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
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors duration-200"
        >
          {loading ? "جاري الإرسال..." : "إرسال الطلب"}
        </button>
      </form>
    </div>
  );
}
