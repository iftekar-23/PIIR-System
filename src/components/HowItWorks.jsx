import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    if (stepsRef.current.length > 0) {
      gsap.fromTo(stepsRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
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

  const steps = [
    {
      number: "1",
      title: "Report Issue",
      description: "Upload photo, add location & details.",
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "2", 
      title: "Admin Assigns",
      description: "Staff verifies & updates progress.",
      color: "from-green-500 to-green-600"
    },
    {
      number: "3",
      title: "Resolved",
      description: "Citizen gets real-time updates.",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      className="py-20 bg-blue-50 rounded-xl"
      data-aos="fade-up"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        How It Works
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            ref={el => stepsRef.current[index] = el}
            className="relative"
            whileHover={{ y: -10, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
              whileHover={{ 
                rotate: 360,
                scale: 1.2
              }}
              transition={{ duration: 0.5 }}
            >
              {step.number}
            </motion.div>
            
            <motion.h3 
              className="font-semibold text-xl text-blue-600 mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {step.title}
            </motion.h3>
            
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
            >
              {step.description}
            </motion.p>

            {/* Connecting line for desktop */}
            {index < steps.length - 1 && (
              <motion.div
                className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.3 + 0.5 }}
                style={{ transformOrigin: "left" }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HowItWorks;
