import React, { useEffect, useState } from "react";
import { VscChevronLeft } from "react-icons/vsc";
import { Link } from "react-router";
import { api } from "../services/api";
import DonateCard from "../components/DonateCard";

export default function Donations() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/donate`);
      if (response.data.status === "success") {
        setCampaigns(response.data.data.campaigns);
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">حدث خطأ في تحميل المشاريع</div>
      </div>
    );
  }

  return (
    <div className="mt-20">
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
        <p className="text-gray-400">تبرع</p>
      </div>

      <h1 className="my-12 mx-20 text-4xl text-indigo-600 font-bold">
        التبرعات{" "}
      </h1>

      <div className="bg-gray-50 mt-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-20">
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <DonateCard key={campaign._id} campaign={campaign} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 space-y-4">
              <p className="text-gray-500 text-lg">
                لا توجد تبرعات متاحة حالياً
              </p>
              <Link
                to="/services"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow"
              >
                إنشاء تبرع جديد
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
