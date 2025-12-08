import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import {
  FiZap,
  FiEye,
  FiHeadphones,
  FiBell,
  FiCpu,
  FiLayers,
} from "react-icons/fi";

const features = [
  {
    title: "Fast Reporting",
    desc: "Report issues within seconds.",
    icon: <FiZap />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Real-time Tracking",
    desc: "Track issue status anytime.",
    icon: <FiEye />,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Premium Support",
    desc: "Priority service for premium users.",
    icon: <FiHeadphones />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Smart Notifications",
    desc: "Get updates instantly on issue progress.",
    icon: <FiBell />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "AI-Powered Suggestions",
    desc: "System recommends solutions automatically.",
    icon: <FiCpu />,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Multi-Category Issues",
    desc: "Report any type of urban problem easily.",
    icon: <FiLayers />,
    color: "bg-indigo-100 text-indigo-600",
  },
];

const Features = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Features
      </h2>

      <Swiper
        loop={true}
        centeredSlides={true}
        spaceBetween={20}
        modules={[Autoplay]}
        grabCursor={true}
        autoplay={{
          delay: 1800,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="px-6"
      >
        {features.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="p-8 bg-white shadow-md hover:shadow-xl rounded-2xl text-center transition-transform hover:-translate-y-2">
              <div
                className={`w-16 h-16 mx-auto flex items-center justify-center rounded-xl text-3xl mb-5 ${item.color}`}
              >
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600 mt-3">{item.desc}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Features;
