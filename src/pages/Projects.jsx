import React, { useEffect, useState } from "react";
import { VscChevronLeft } from "react-icons/vsc";
import { Link } from "react-router";
import { api } from "../services/api";
import DonationCard from "../components/DonationCard";

export default function Projects() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/donation`);
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">حدث خطأ في تحميل المشاريع</div>
      </div>
    );
  }

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
        <p className="text-gray-400">مشاريع عامة</p>
      </div>
      <h1 className="my-12 mx-20 text-4xl text-[#1f2a37] font-bold">مشاريع</h1>
      <div className="relative my-12 mx-20 flex justify-center items-center">
        <img
          className="h-[100px] opacity-50 absolute top-0 right-0"
          src="	https://ehsan.sa/ehsan-ui/images/snapel/left-snapel.svg"
          alt="سنابل إحسان"
        />
        <div className="bg-[#007960] p-6 font-bold text-white text-center w-fit rounded-md">
          مشاريع عامة
        </div>
        <img
          className="left-0 top-0 h-[100px] opacity-50 absolute"
          src="https://ehsan.sa/ehsan-ui/images/snapel/right-snapel.svg"
          alt="سنابل إحسان"
        ></img>
      </div>
      <div className="mx-20 py-4 font-bold space-y-2">
        <p className="text-[#007960] text-2xl">مشاريع عامة</p>
        <p>
          فرص تبرع متنوعة تصنع أثراً مستداماً وتحقق أثراً اجتماعياً واسعاً
          للحالات الأشد احتياجاً.
        </p>
      </div>
      <div className="bg-gray-100 mt-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-20">
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <DonationCard key={campaign._id} campaign={campaign} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 space-y-4">
              <p className="text-gray-500 text-lg">
                لا توجد مشاريع متاحة حالياً
              </p>
              <Link
                to="/services"
                className="px-6 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition-colors"
              >
                إنشاء مشروع جديد
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
