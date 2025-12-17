import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const headerRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        }
      );
    }

    if (contactInfoRef.current && formRef.current) {
      gsap.fromTo([contactInfoRef.current, formRef.current],
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <motion.section 
      className="py-20 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      data-aos="fade-up"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-green-200 to-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      {/* HEADER */}
      <motion.div 
        ref={headerRef}
        className="text-center mb-20 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-block mb-6"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold shadow-lg">
            💬 Get In Touch
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-400 text-transparent bg-clip-text mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Contact Us
        </motion.h1>
        
        <motion.div
          className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        
        <motion.p 
          className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Have questions, suggestions, or need support?  
          The CityFix team is always here to help you build better cities.
        </motion.p>
      </motion.div>

      {/* GRID */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        
        {/* CONTACT INFO – FULL HEIGHT */}
        <motion.div 
          ref={contactInfoRef}
          className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-10 flex flex-col justify-between h-full border border-white/20 modern-card relative overflow-hidden"
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          whileHover={{ 
            scale: 1.02,
          }}
          data-aos="fade-right"
        >
          {/* Decorative background pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
          <div className="space-y-6">

            <motion.div 
              className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl flex items-start gap-4 border border-blue-100 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, x: 10 }}
            >
              <motion.div
                className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <FiMail className="text-xl" />
              </motion.div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-800 mb-1">Email</h4>
                <p className="text-blue-600 font-medium">support@cityfix.com</p>
              </div>
              <div className="absolute top-2 right-2 w-6 h-6 bg-blue-200 rounded-full opacity-30"></div>
            </motion.div>

            <motion.div 
              className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl flex items-start gap-4 border border-green-100 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, x: 10 }}
            >
              <motion.div
                className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <FiPhone className="text-xl" />
              </motion.div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-800 mb-1">Phone</h4>
                <p className="text-green-600 font-medium">+1 800 123 4567</p>
              </div>
              <div className="absolute top-2 right-2 w-6 h-6 bg-green-200 rounded-full opacity-30"></div>
            </motion.div>

            <motion.div 
              className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl flex items-start gap-4 border border-purple-100 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05, x: 10 }}
            >
              <motion.div
                className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <FiMapPin className="text-xl" />
              </motion.div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-800 mb-1">Address</h4>
                <p className="text-purple-600 font-medium">
                  CityFix HQ, Downtown Innovation Center
                </p>
              </div>
              <div className="absolute top-2 right-2 w-6 h-6 bg-purple-200 rounded-full opacity-30"></div>
            </motion.div>

          </div>
        </motion.div>

        {/* FORM – FULL HEIGHT */}
        <motion.div 
          ref={formRef}
          className="bg-white/80 backdrop-blur-sm shadow-xl p-12 rounded-3xl flex flex-col justify-between h-full border border-white/20 modern-card relative overflow-hidden"
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ 
            scale: 1.02,
          }}
          data-aos="fade-left"
        >
          {/* Decorative background pattern */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-20 -translate-x-20 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-100 to-cyan-100 rounded-full translate-y-16 translate-x-16 opacity-50"></div>
          <div>
            <motion.h3 
              className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 text-transparent bg-clip-text mb-8 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Send Us a Message
            </motion.h3>

            <form className="space-y-6 relative z-10">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                  whileFocus={{ scale: 1.02 }}
                ></motion.textarea>
              </motion.div>

              <motion.button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Send Message</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </form>
          </div>
        </motion.div>

      </motion.div>
    </motion.section>
  );
};

export default Contact;
