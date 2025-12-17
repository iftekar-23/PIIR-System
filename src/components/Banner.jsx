import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  const bannerRef = useRef(null);
  
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

  useEffect(() => {
    if (bannerRef.current) {
      gsap.fromTo(bannerRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <motion.div 
      className="w-full flex justify-center my-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      data-aos="fade-up"
    >
      <div ref={bannerRef} className="w-[70%] md:w-[75%] sm:w-[90%]">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          loop={true}
          pagination={{ clickable: true }}
          spaceBetween={20}
          className="rounded-2xl overflow-hidden"
        >
          {slides.map((s, index) => (
            <SwiperSlide key={s.id}>
              <motion.div
                className="h-[60vh] w-full rounded-2xl bg-cover bg-center bg-no-repeat flex items-center"
                style={{
                  backgroundImage: `url(${s.img})`,
                }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* DARK OVERLAY */}
                <div className="bg-black/40 w-full h-full flex items-center justify-center text-center rounded-2xl p-10">
                  <div className="max-w-2xl text-white space-y-4">
                    <motion.h1 
                      className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-lg"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {s.title}
                    </motion.h1>

                    <motion.p 
                      className="text-gray-200 text-lg drop-shadow-md"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      {s.desc}
                    </motion.p>

                    <motion.div 
                      className="flex gap-4 justify-center pt-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <motion.button 
                        className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">🚀 Report an Issue</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                      <motion.button 
                        className="border-2 border-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 backdrop-blur-sm bg-white/10"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🔍 View Issues
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
};

export default Banner;
