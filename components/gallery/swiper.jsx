"use client";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import SwiperImages from "./swiper-images";

const SwiperPanel = ({ images }) => {
  return (
    <div className="mx-auto mt-6 w-full max-w-2xl lg:max-w-none relative">
      <Swiper
        style={{
          "--swiper-pagination-color": "#FFBA08",
          "--swiper-pagination-bullet-inactive-color": "#999999",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "16px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
        }}
        modules={[Pagination, A11y, Autoplay]}
        spaceBetween={50}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {images.attributes.stock === 1 && (
          <div className="absolute inset-0 h-full w-full flex justify-center items-center bg-gray-50 bg-opacity-60 z-50">
            <span className="bg-black rounded-md text-white px-4 py-2 z-50 text-lg">
              Jashtë Stokut
            </span>
          </div>
        )}

        {images?.attributes?.infoimg?.data.map((img) => (
          <SwiperSlide key={img.id}>
            <SwiperImages image={img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperPanel;
