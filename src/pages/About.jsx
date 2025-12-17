import { FiEye, FiZap, FiUsers } from "react-icons/fi";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (cardsRef.current.length > 0) {
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 80, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current[0],
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
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      data-aos="fade-up"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-gradient-to-r from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* HEADER */}
      <motion.div 
        ref={headerRef}
        className="text-center mb-16 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-block mb-4"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold">
            🏙️ Smart City Solutions
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-400 text-transparent bg-clip-text mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          About CityFix
        </motion.h1>
        
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        
        <motion.p 
          className="text-gray-600 max-w-4xl mx-auto text-xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          CityFix is a next-generation public infrastructure reporting system
          built to make cities smarter, cleaner, and more efficient. Our goal is
          to connect citizens and municipal authorities in a transparent and
          data-driven way.
        </motion.p>
      </motion.div>

      {/* FEATURES GRID */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        
        {/* CARD 1 */}
        <motion.div 
          ref={el => cardsRef.current[0] = el}
          className="group p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all text-center border border-white/20 modern-card"
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
          whileHover={{ 
            y: -15, 
            scale: 1.02,
          }}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <motion.div 
            className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center rounded-3xl mx-auto mb-6 text-4xl shadow-lg group-hover:shadow-xl"
            whileHover={{ 
              rotate: 360,
              scale: 1.1
            }}
            transition={{ duration: 0.5 }}
          >
            <FiEye />
          </motion.div>
          <motion.h3 
            className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 text-transparent bg-clip-text mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Transparency
          </motion.h3>
          <motion.p 
            className="text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Track every reported issue from submission to resolution. Citizens stay
            informed at every step with real-time updates.
          </motion.p>
          
          {/* Decorative element */}
          <motion.div
            className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* CARD 2 */}
        <motion.div 
          ref={el => cardsRef.current[1] = el}
          className="group p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all text-center border border-white/20 modern-card relative"
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
          whileHover={{ 
            y: -15, 
            scale: 1.02,
          }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <motion.div 
            className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-600 text-white flex items-center justify-center rounded-3xl mx-auto mb-6 text-4xl shadow-lg group-hover:shadow-xl"
            whileHover={{ 
              rotate: 360,
              scale: 1.1
            }}
            transition={{ duration: 0.5 }}
          >
            <FiZap />
          </motion.div>
          <motion.h3 
            className="text-2xl font-bold bg-gradient-to-r from-yellow-700 to-orange-500 text-transparent bg-clip-text mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Efficiency
          </motion.h3>
          <motion.p 
            className="text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            CityFix optimizes administrative workflows, helping municipal staff
            respond and resolve issues faster than ever before.
          </motion.p>
          
          {/* Decorative element */}
          <motion.div
            className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>

        {/* CARD 3 */}
        <motion.div 
          ref={el => cardsRef.current[2] = el}
          className="group p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all text-center border border-white/20 modern-card relative"
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
          whileHover={{ 
            y: -15, 
            scale: 1.02,
          }}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <motion.div 
            className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center rounded-3xl mx-auto mb-6 text-4xl shadow-lg group-hover:shadow-xl"
            whileHover={{ 
              rotate: 360,
              scale: 1.1
            }}
            transition={{ duration: 0.5 }}
          >
            <FiUsers />
          </motion.div>
          <motion.h3 
            className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-500 text-transparent bg-clip-text mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Community Impact
          </motion.h3>
          <motion.p 
            className="text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Empowering citizens to actively participate in improving their
            neighborhoods and creating sustainable urban environments.
          </motion.p>
          
          {/* Decorative element */}
          <motion.div
            className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </motion.div>

      </motion.div>
    </motion.section>
  );
};

export default About;
