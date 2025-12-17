import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PremiumSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const benefitsRef = useRef([]);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { scale: 0.8, opacity: 0, rotateY: 15 },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (benefitsRef.current.length > 0) {
      gsap.fromTo(benefitsRef.current,
        { opacity: 0, x: -50, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const benefits = [
    {
      icon: "⭐",
      title: "Priority Issue Verification",
      description: "Your issues get reviewed faster than regular users."
    },
    {
      icon: "⭐",
      title: "Dedicated Support", 
      description: "Premium users get priority customer support."
    },
    {
      icon: "⭐",
      title: "Faster Resolutions",
      description: "Assigned staff start working on your case sooner."
    },
    {
      icon: "⭐",
      title: "Exclusive Profile Badge",
      description: "Premium citizens get a special verified badge."
    }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      className="py-20 relative"
      data-aos="fade-up"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Glow Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-yellow-100/40 to-blue-100/40 blur-3xl -z-10"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

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
          Premium Citizen Benefits
        </motion.h2>
        <motion.p 
          className="text-gray-600 mt-2 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Upgrade for faster service, priority handling, and exclusive features.
        </motion.p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div 
          ref={cardRef}
          className="backdrop-blur-xl bg-white/60 border border-white/30 shadow-xl rounded-2xl p-10"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
          }}
          transition={{ duration: 0.3 }}
        >
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.li 
                key={index}
                ref={el => benefitsRef.current[index] = el}
                className="flex items-start gap-4"
                whileHover={{ x: 10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="text-yellow-500 text-3xl"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.3
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {benefit.icon}
                </motion.span>
                <div>
                  <motion.h3 
                    className="text-xl font-semibold text-blue-700"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {benefit.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 mt-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  >
                    {benefit.description}
                  </motion.p>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition-all duration-300 font-semibold"
              whileHover={{ 
                scale: 1.05,
                y: -2,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Upgrade Now
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PremiumSection;
