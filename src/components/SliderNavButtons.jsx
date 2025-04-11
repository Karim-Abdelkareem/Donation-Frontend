import React from "react";

export default function SliderNavButtons({ prevClass, nextClass }) {
  return (
    <>
      <div className={`swiper-button-prev ${prevClass} !text-indigo-600`}></div>
      <div className={`swiper-button-next ${nextClass} !text-indigo-600`}></div>
    </>
  );
}
