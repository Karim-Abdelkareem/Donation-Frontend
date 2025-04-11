import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SliderNavButtons from "./SliderNavButtons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "../styles/DonationsSlider.css";

import { Link } from "react-router";
import { api } from "../services/api";
import DonateCard from "./DonateCard";

export default function DonateSlider() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
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
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-600">حدث خطأ في تحميل الحملات</div>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
        <div className="text-gray-600 text-lg">لا توجد حملات متاحة حالياً</div>
        <Link to="/services">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
            إنشاء حملة جديدة
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative px-4">
      <SliderNavButtons prevClass="donate-prev" nextClass="donate-next" />
      <Swiper
        dir="rtl"
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={10}
        grabCursor={true}
        navigation={{
          nextEl: ".donate-prev",
          prevEl: ".donate-next",
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
            <DonateCard campaign={campaign} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="my-16 flex justify-center items-center">
        <Link to={"/donations"}>
          <button className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow">
            المزيد من الفرص
          </button>
        </Link>
      </div>
    </div>
  );
}
