import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/carousel.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useRef, useState } from "react";

export default function Carousel() {
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    if (isPlaying) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className} text-white bg-white text-2xl"></span>`;
        },
      }}
      navigation={{
        nextEl: ".carousel-next",
        prevEl: ".carousel-prev",
      }}
      className="hero-carousel h-[400px] w-full"
    >
      <div className="swiper-button-prev carousel-prev"></div>
      <div className="swiper-button-next carousel-next"></div>
      <button
        onClick={handlePlayPause}
        className="absolute cursor-pointer text-white -bottom-[3px] -translate-y-1/2 left-31 border border-white rounded-md p-3 z-10"
      >
        {isPlaying ? (
          <img
            src="https://ehsan.sa/ehsan-ui/images/icons/pause-icon.svg"
            alt=""
          />
        ) : (
          <svg
            className="play-img icon-white"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.852 3.28676L9.94054 3.33706C11.5735 4.26475 12.8567 4.99375 13.7709 5.66154C14.6913 6.33392 15.3721 7.0367 15.6159 7.96321C15.7947 8.64269 15.7947 9.35743 15.6159 10.0369C15.3721 10.9634 14.6913 11.6662 13.7709 12.3386C12.8567 13.0064 11.5735 13.7354 9.94058 14.663L9.852 14.7134C8.27461 15.6095 7.03303 16.3149 6.02322 16.7444C5.0053 17.1774 4.07729 17.3968 3.17536 17.1412C2.51252 16.9534 1.90941 16.5969 1.42356 16.1067C0.764188 15.4414 0.49951 14.522 0.374288 13.4154C0.249982 12.317 0.24999 10.879 0.25 9.05016V8.94997C0.24999 7.12109 0.249982 5.68315 0.374288 4.5847C0.49951 3.47816 0.764188 2.55867 1.42356 1.89341C1.90941 1.40323 2.51252 1.04672 3.17536 0.858895C4.07729 0.603311 5.0053 0.822753 6.02322 1.25571C7.03303 1.68522 8.27461 2.3906 9.852 3.28676ZM5.43611 2.63604C4.51385 2.24377 3.98374 2.18888 3.58431 2.30207C3.17108 2.41917 2.79377 2.64179 2.48892 2.94935C2.19206 3.24887 1.97861 3.74743 1.86477 4.75337C1.75115 5.75741 1.75 7.1102 1.75 9.00006C1.75 10.8899 1.75115 12.2427 1.86477 13.2467C1.97861 14.2527 2.19206 14.7513 2.48892 15.0508C2.79377 15.3583 3.17108 15.581 3.58431 15.6981C3.98374 15.8112 4.51385 15.7564 5.43611 15.3641C6.35708 14.9724 7.524 14.3108 9.15527 13.384C10.8421 12.4257 12.0497 11.7383 12.8861 11.1273C13.7244 10.5149 14.0557 10.0717 14.1653 9.65515C14.2782 9.22592 14.2782 8.7742 14.1653 8.34497C14.0557 7.92845 13.7244 7.4852 12.8861 6.8728C12.0497 6.26183 10.8421 5.57445 9.15527 4.6161C7.524 3.68934 6.35708 3.02776 5.43611 2.63604Z"
              fill="white"
            ></path>
          </svg>
        )}
      </button>
      <SwiperSlide>
        <img
          src="https://ehsanbaner.s3.me-south-1.amazonaws.com/fitrweb.png"
          alt=""
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute text-white space-y-4 top-1/2 -translate-y-1/2 -translate-x-1/4 z-10">
          <h2 className="text-3xl font-bold">عايد احبابك بصدقة</h2>
          <p className="text-base font-bold">وادخل الفرح علي المستحقين</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://ehsanbaner.s3.me-south-1.amazonaws.com/zakatwebcopy.png"
          alt=""
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute text-white space-y-4 top-1/2 -translate-y-1/2 -translate-x-1/4 z-10">
          <h2 className="text-3xl font-bold">أخرج زكاة مالك</h2>
          <p className="text-base font-bold">بيسر وفي ثوانٍ</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://ehsanbaner.s3.me-south-1.amazonaws.com/littleweb1.png"
          alt=""
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute text-white space-y-4 top-1/2 -translate-y-1/2 -translate-x-1/4 z-10">
          <h2 className="text-3xl font-bold">المحسن الصغير</h2>
          <p className="text-base">شاركوا مع أطفالكم فرحة العطاء</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://ehsanbaner.s3.me-south-1.amazonaws.com/m4.png"
          alt=""
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute text-white space-y-4 top-1/2 -translate-y-1/2 -translate-x-1/4 z-10">
          <h2 className="text-3xl font-bold">بكريم عطائك</h2>
          <p className="text-base">تحيي أملاً وتفرج هماً</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://ehsanbaner.s3.me-south-1.amazonaws.com/MOSQUESWEB1.png"
          alt=""
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute text-white space-y-4 top-1/2 -translate-y-1/2 -translate-x-1/4 z-10">
          <h2 className="text-3xl font-bold">عطاء جزيل وثواب عظيم</h2>
          <p className="text-base">عبر فرص العناية بالمساجد</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://ehsanbaner.s3.me-south-1.amazonaws.com/redisginWEBdawri.png"
          alt=""
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute text-white space-y-4 top-1/2 -translate-y-1/2 -translate-x-1/4 z-10">
          <h2 className="text-3xl font-bold">التبرع الدوري</h2>
          <p className="text-base">أجر وعون للمتعفيين</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://ehsanbaner.s3.me-south-1.amazonaws.com/cweb.png"
          alt=""
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute text-white space-y-4 top-1/2 -translate-y-1/2 -translate-x-1/4 z-10">
          <h2 className="text-3xl font-bold">خدمة الحملات</h2>
          <p className="text-base">للمساهمة في جمع التبرعات</p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
