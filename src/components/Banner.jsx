// BannerSlider.jsx
// https://i.ibb.co.com/pjKFZN3W/computer-fixes-reporting.jpg"
// https://i.ibb.co.com/4wbD7PRG/shipping-logistic-delivery-freight-cargo-concept-53876-124951.avif
// https://i.ibb.co.com/bgWMQ2RR/hq720.jpg
// BannerSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Report Issues Instantly",
      desc: "Capture photos, submit problems, and help improve your city faster.",
      img: "https://i.ibb.co/pjKFZN3W/computer-fixes-reporting.jpg",
    },
    {
      id: 2,
      title: "Track Issue Status",
      desc: "Stay updated as the authorities fix the problems you report.",
      img: "https://i.ibb.co/4wbD7PRG/shipping-logistic.jpg",
    },
    {
      id: 3,
      title: "Make Your Community Better",
      desc: "Your reports help build cleaner, safer, and smarter cities.",
      img: "https://i.ibb.co/bgWMQ2RR/hq720.jpg",
    },
  ];

  return (
    <div className="w-full flex justify-center my-10">
      <div className="w-[70%] md:w-[75%] sm:w-[90%]">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          loop={true}
          pagination={{ clickable: true }}
          spaceBetween={20}
          className="rounded-2xl overflow-hidden"
        >
          {slides.map((s) => (
            <SwiperSlide key={s.id}>
              <div
                className="h-[60vh] w-full rounded-2xl bg-cover bg-center bg-no-repeat flex items-center"
                style={{
                  backgroundImage: `url(${s.img})`,
                }}
              >
                {/* DARK OVERLAY */}
                <div className="bg-black/40 w-full h-full flex items-center justify-center text-center rounded-2xl p-10">
                  <div className="max-w-2xl text-white space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-lg">
                      {s.title}
                    </h1>

                    <p className="text-gray-200 text-lg drop-shadow-md">
                      {s.desc}
                    </p>

                    <div className="flex gap-4 justify-center pt-4">
                      <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition">
                        Report an Issue
                      </button>
                      <button className="border border-white px-6 py-3 rounded-md hover:bg-white hover:text-blue-600 transition">
                        View Issues
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BannerSlider;
