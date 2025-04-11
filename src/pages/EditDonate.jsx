import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { api } from "../services/api";
import uploadToCloudinary from "../utils/cloudinary";
import { toast } from "react-hot-toast";

export default function EditDonate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    phone: "",
    proofImages: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState([]);
  const fileInputRef = useRef(null);

  // Fetch donate data
  useEffect(() => {
    const fetchDonate = async () => {
      try {
        const response = await api.get(`/api/donate/${id}`);
        const donate = response.data.data.campaign;
        setFormData({
          title: donate.title,
          description: donate.description,
          phone: donate.phone,
          status: donate.status,
          proofImages: [],
        });
        // Set initial preview images
        if (donate.proofImages) {
          setPreview(donate.proofImages);
        }
        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch donate details");
        // navigate("/");
      }
    };
    fetchDonate();
  }, [id, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      proofImages: [...prev.proofImages, ...files],
    }));

    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPreview((prev) => [...prev, ...imageUrls]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      preview.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Upload new images to Cloudinary
      const newImageUrls = await Promise.all(
        formData.proofImages.map(async (image) => {
          const cloudinaryUrl = await uploadToCloudinary(image);
          return cloudinaryUrl;
        })
      );

      // Combine existing and new image URLs
      const allImageUrls = [
        ...preview.filter((url) => !url.startsWith("blob:")),
        ...newImageUrls,
      ];

      const updateData = {
        title: formData.title,
        description: formData.description,
        phone: formData.phone,
        proofImages: allImageUrls,
      };

      const response = await api.patch(`/api/donate/${id}`, updateData);

      if (response.data.status === "success") {
        toast.success("تم تحديث طلب التبرع بنجاح!", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#4f46e5",
            color: "#fff",
          },
        });
        navigate("/dashboard/donates");
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="mt-20 mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        تعديل طلب التبرع
      </h1>

      {/* Status Badge */}
      <div className="flex justify-center mb-6">
        <div
          className={`${
            formData.status === "active"
              ? "bg-indigo-100 text-indigo-800 border-indigo-200"
              : "bg-red-100 text-red-800 border-red-200"
          } px-4 py-2 rounded-full border text-sm font-medium`}
        >
          {formData.status === "active" ? "طلب نشط" : "طلب معلق"}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6 text-center">
          {error}
        </div>
      )}

      {/* Form with background */}
      <div className="bg-gray-50 rounded-lg shadow-sm p-8">
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

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/donates")}
              className="w-1/2 bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 disabled:opacity-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "جاري التحديث..." : "تحديث الطلب"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
