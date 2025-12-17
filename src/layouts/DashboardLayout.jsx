import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import AdminSidebar from "../pages/Dashboard/AdminSidebar";
import StaffSidebar from "../pages/Dashboard/StaffSidebar";
import CitizenSidebar from "../pages/Dashboard/CitizenSidebar";
import { FaHome, FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const DashboardLayout = () => {
  const { role, loading } = useRole();
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!loading && sidebarRef.current && contentRef.current) {
      // GSAP animations for dashboard entrance
      gsap.fromTo(sidebarRef.current,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
      
      gsap.fromTo(contentRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );
    }
  }, [loading, role]);

  if (loading) {
    return (
      <motion.div 
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
        />
        <span className="ml-3 text-lg">Loading dashboard...</span>
      </motion.div>
    );
  }

  return (
    <div className="flex min-h-screen">

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-y-0 left-0 bg-white shadow-lg w-64 p-5 z-50 md:hidden"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.button 
              onClick={() => setOpen(false)} 
              className="mb-4"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center gap-2 text-blue-600 mb-5">
                <FaHome /> Home
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {role === "admin" && <AdminSidebar />}
              {role === "staff" && <StaffSidebar />}
              {role === "citizen" && <CitizenSidebar />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <motion.div 
        ref={sidebarRef}
        className="hidden md:block w-64 bg-white/80 backdrop-blur-sm shadow-xl p-6 border-r border-white/20"
        data-aos="slide-right"
      >
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50 to-transparent opacity-50 rounded-t-lg"></div>
        <motion.div
          className="relative z-10 mb-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="flex items-center gap-3 text-blue-600 p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-all duration-300">
            <motion.div
              className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FaHome className="text-sm" />
            </motion.div>
            <span className="font-semibold">Back to Home</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {role === "admin" && <AdminSidebar />}
          {role === "staff" && <StaffSidebar />}
          {role === "citizen" && <CitizenSidebar />}
        </motion.div>
      </motion.div>

      {/* CONTENT */}
      <motion.div 
        ref={contentRef}
        className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen"
        data-aos="fade-left"
      >
        <motion.button
          onClick={() => setOpen(true)}
          className="md:hidden mb-4 text-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaBars />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
