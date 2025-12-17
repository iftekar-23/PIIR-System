import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useAxiosSecure from "../hooks/useAxiosSecure";

gsap.registerPlugin(ScrollTrigger);

const LatestResolvedIssues = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/issues?status=Resolved&limit=6");
        setIssues(res.data || []);
      } catch (err) {
        console.error("Failed to load resolved issues", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [axiosSecure]);

  useEffect(() => {
    if (!loading && issues.length > 0 && headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
  }, [loading, issues]);

  const handleUpvote = (issue) => {
    // implement upvote if needed
    console.log("Upvote", issue._id);
  };

  if (loading) {
    return (
      <motion.div 
        className="py-10 text-center text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
        />
        Loading resolved issues...
      </motion.div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="bg-white border rounded-xl p-10 text-center text-gray-500">
        No resolved issues found
      </div>
    );
  }

  return (
    <motion.section 
      ref={sectionRef}
      className="space-y-6 my-10"
      data-aos="fade-up"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <motion.div 
        ref={headerRef}
        className="flex items-center justify-between"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <motion.h2 
            className="text-2xl font-bold text-gray-800"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Latest Resolved Issues
          </motion.h2>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/issues?status=Resolved"
            className="text-sm text-blue-600 hover:underline font-medium transition-all duration-300"
          >
            View all
          </Link>
        </motion.div>
      </motion.div>

      {/* GRID */}
      <motion.div 
        ref={gridRef}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <AnimatePresence>
          {issues.map((issue, index) => (
            <motion.div
              key={issue._id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              className="group rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
            {/* IMAGE + STATUS + PRIORITY */}
            <div className="relative h-48 w-full overflow-hidden">
              <motion.img
                src={issue.image || "/placeholder.jpg"}
                alt={issue.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Priority */}
              <motion.div 
                className="absolute top-3 left-3 flex gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    issue.priority === "High"
                      ? "bg-red-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {issue.priority} Priority
                </motion.span>
              </motion.div>

              {/* Status */}
              <motion.span 
                className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-white text-gray-700 shadow"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
              >
                {issue.status}
              </motion.span>
            </div>

            {/* Content */}
            <motion.div 
              className="p-5 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.h2 
                className="text-lg text-left font-bold text-gray-800 leading-tight line-clamp-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {issue.title}
              </motion.h2>

              <motion.div 
                className="flex justify-between items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.span 
                  className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {issue.category}
                </motion.span>
                <motion.div 
                  className="flex items-center gap-2 text-gray-600 text-sm"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  📍<span>{issue.location}</span>
                </motion.div>
              </motion.div>

              <div className="border-t border-gray-200"></div>

              {/* Action */}
              <motion.div 
                className="flex items-center justify-between pt-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.button
                  onClick={() => handleUpvote(issue)}
                  className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaArrowUp className="text-lg" />
                  </motion.div>
                  {issue.upvotes || 0}
                </motion.button>

                <motion.button
                  onClick={() => navigate(`/issue/${issue._id}`)}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-medium transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default LatestResolvedIssues;
