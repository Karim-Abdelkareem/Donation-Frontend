import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "../styles/DonationsSlider.css";

import DonationCard from "./DonationCard";
import { Link } from "react-router";
import { api } from "../services/api";

export default function DonationsSlider() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
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
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500">حدث خطأ في تحميل الحملات</div>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
        <div className="text-gray-500 text-lg">لا توجد حملات متاحة حالياً</div>
        <Link to="/services">
          <button className="px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800">
            إنشاء حملة جديدة
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="swiper-button-prev donations-prev"></div>
      <div className="swiper-button-next donations-next"></div>
      <Swiper
        dir="rtl"
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={20}
        grabCursor={true}
        navigation={{
          nextEl: ".donations-prev",
          prevEl: ".donations-next",
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 25 },
        }}
        className="donations-slider"
      >
        {campaigns.map((campaign, index) => (
          <SwiperSlide key={index}>
            <DonationCard campaign={campaign} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="my-16 flex justify-center items-center">
        <Link to={"/projects"}>
          <button className="px-3 text-sm h-10 text-white font-semibold bg-emerald-700 rounded-md hover:bg-emerald-800 cursor-pointer">
            المزيد من الفرص
          </button>
        </Link>
      </div>
    </div>
  );
}
