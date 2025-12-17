import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaExclamationCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

gsap.registerPlugin(ScrollTrigger);

/* ================= STAT CARD ================= */
const StatCard = ({ icon, title, value, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ 
      duration: 0.6, 
      delay: index * 0.1,
      type: "spring",
      stiffness: 100
    }}
    whileHover={{ 
      y: -10, 
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
    }}
    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md flex items-center gap-4 cursor-pointer"
    data-aos="fade-up"
    data-aos-delay={index * 100}
  >
    <motion.div 
      className={`text-3xl ${color}`}
      whileHover={{ 
        rotate: 360,
        scale: 1.2
      }}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
    <div>
      <motion.p 
        className="text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
      >
        {title}
      </motion.p>
      <motion.p 
        className="text-2xl font-semibold text-gray-800"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1 + 0.4,
          type: "spring",
          stiffness: 200
        }}
      >
        {value}
      </motion.p>
    </div>
  </motion.div>
);

/* ================= TABLE CONTAINER ================= */
const TableCard = ({ title, children, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ 
      duration: 0.6, 
      delay: index * 0.1,
      type: "spring",
      stiffness: 100
    }}
    whileHover={{ 
      scale: 1.02,
      boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
    }}
    className="bg-white border border-gray-200 rounded-xl shadow-sm"
    data-aos="fade-up"
    data-aos-delay={index * 200}
  >
    <motion.div 
      className="px-6 py-4 border-b"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    </motion.div>
    <motion.div 
      className="overflow-x-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {children}
    </motion.div>
  </motion.div>
);

/* ================= ADMIN HOME ================= */
const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({});
  const [latestIssues, setLatestIssues] = useState([]);
  const [latestPayments, setLatestPayments] = useState([]);
  const [latestUsers, setLatestUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const headerRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [statsRes, issuesRes, paymentsRes, usersRes] = await Promise.all([
          axiosSecure.get("/admin/dashboard/stats"),
          axiosSecure.get("/admin/issues"),
          axiosSecure.get("/admin/payments"),
          axiosSecure.get("/admin/users")
        ]);
        
        setStats(statsRes.data);
        setLatestIssues(issuesRes.data.slice(0, 5));
        setLatestPayments(paymentsRes.data.slice(0, 5));
        setLatestUsers(usersRes.data.slice(0, 5));
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [axiosSecure]);

  useEffect(() => {
    if (!loading && headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [loading]);

  if (loading) {
    return (
      <motion.div 
        className="flex items-center justify-center min-h-[400px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
        <span className="ml-4 text-lg text-gray-600">Loading dashboard...</span>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* HEADER */}
      <motion.div 
        ref={headerRef}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-2xl font-bold text-gray-800"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Admin Dashboard
        </motion.h1>
        <motion.p 
          className="text-gray-500"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Overview of system activity
        </motion.p>
      </motion.div>

      {/* STATS */}
      <motion.div 
        ref={statsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <StatCard
          icon={<FaExclamationCircle />}
          title="Total Issues"
          value={stats.totalIssues || 0}
          color="text-blue-600"
          index={0}
        />
        <StatCard
          icon={<FaCheckCircle />}
          title="Resolved Issues"
          value={stats.resolvedIssues || 0}
          color="text-green-600"
          index={1}
        />
        <StatCard
          icon={<FaTimesCircle />}
          title="Rejected Issues"
          value={stats.rejectedIssues || 0}
          color="text-red-600"
          index={2}
        />
        <StatCard
          icon={<FaMoneyBillWave />}
          title="Total Payments"
          value={`৳ ${stats.totalPayments || 0}`}
          color="text-purple-600"
          index={3}
        />
      </motion.div>

      {/* ================= LATEST ISSUES ================= */}
      <TableCard title="Latest Issues" index={0}>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-5 py-3 text-center">Title</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Priority</th>
              <th className="px-5 py-3">Assigned</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {latestIssues.map((issue, index) => (
                <motion.tr
                  key={issue._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "#f9fafb", scale: 1.01 }}
                  className="border-t hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {issue.title}
                  </td>
                  <td className="px-5 py-3 capitalize">{issue.category}</td>
                  <td className="px-5 py-3">
                    <motion.span 
                      className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700"
                      whileHover={{ scale: 1.1 }}
                    >
                      {issue.status}
                    </motion.span>
                  </td>
                  <td className="px-5 py-3 capitalize">{issue.priority}</td>
                  <td className="px-5 py-3">
                    {issue.assignedTo || "Unassigned"}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </TableCard>

      {/* ================= PAYMENTS ================= */}
      <TableCard title="Latest Payments" index={1}>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-5 py-3 text-center">User</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {latestPayments.map((p, index) => (
                <motion.tr
                  key={p._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "#f9fafb", scale: 1.01 }}
                  className="border-t hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="px-5 py-3">{p.userEmail}</td>
                  <td className="px-5 py-3 font-semibold">৳ {p.amount}</td>
                  <td className="px-5 py-3 capitalize">{p.status}</td>
                  <td className="px-5 py-3 text-gray-500">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </TableCard>

      {/* ================= USERS ================= */}
      <TableCard title="Latest Users" index={2}>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-5 py-3 text-center">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {latestUsers.map((u, index) => (
                <motion.tr
                  key={u._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "#f9fafb", scale: 1.01 }}
                  className="border-t hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="px-5 py-3 font-medium">{u.name}</td>
                  <td className="px-5 py-3">{u.email}</td>
                  <td className="px-5 py-3">{u.phone || "—"}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </TableCard>
    </motion.div>
  );
};

export default AdminHome;
