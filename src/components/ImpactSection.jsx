import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ImpactSection = () => {
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  
  const stats = [
    { label: "Total Issues Reported", value: "12,450+", target: 12450 },
    { label: "Issues Resolved", value: "10,320+", target: 10320 },
    { label: "Active Staff Members", value: "240+", target: 240 },
    { label: "Avg. Response Time", value: "3.8 hrs", target: 3.8 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate counters
            stats.forEach((stat, index) => {
              gsap.to({}, {
                duration: 2,
                ease: "power2.out",
                onUpdate: function() {
                  const progress = this.progress();
                  const currentValue = Math.floor(stat.target * progress);
                  setCounters(prev => {
                    const newCounters = [...prev];
                    newCounters[index] = currentValue;
                    return newCounters;
                  });
                }
              });
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section 
      ref={sectionRef}
      className="py-20 mt-10 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-sm"
      data-aos="fade-up"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-4xl font-bold text-blue-700"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Our Impact
        </motion.h2>
        <motion.p 
          className="text-gray-600 mt-2 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          See how the system is improving city services and building a better community.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            ref={el => statsRef.current[i] = el}
            className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition-all duration-300 text-center"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ 
              y: -10, 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
          >
            <motion.h3 
              className="text-3xl font-bold text-blue-600"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.3, type: "spring", stiffness: 200 }}
            >
              {i === 3 ? `${counters[i].toFixed(1)} hrs` : `${counters[i].toLocaleString()}+`}
            </motion.h3>
            <motion.p 
              className="text-gray-700 mt-2 font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 + 0.5 }}
            >
              {s.label}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ImpactSection;
