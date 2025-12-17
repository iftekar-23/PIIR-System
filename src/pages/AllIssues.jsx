import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp, FaSearch, FaFilter } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

gsap.registerPlugin(ScrollTrigger);

const AllIssues = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");

    const { user } = useAuth();
    
    const headerRef = useRef(null);
    const filtersRef = useRef(null);
    const gridRef = useRef(null);

    // ⬇️ LOAD DATA
    useEffect(() => {
        axiosSecure.get("/issues")
            .then(res => {
                setIssues(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosSecure]);

    useEffect(() => {
        if (!loading && headerRef.current) {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: -50 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            );
        }

        if (!loading && filtersRef.current) {
            gsap.fromTo(filtersRef.current,
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    delay: 0.3,
                    ease: "power2.out" 
                }
            );
        }
    }, [loading]);

    // ⬆️ Handle Upvote
    const handleUpvote = (issue) => {
        if (!user) return navigate("/login");

        if (issue.userEmail === user.email) {
            alert("You cannot upvote your own issue!");
            return;
        }

        axiosSecure.patch(`/issues/upvote/${issue._id}`, { email: user.email })
            .then(() => {
                // 🔥 UI Update instantly
                const updated = issues.map(i =>
                    i._id === issue._id
                        ? { ...i, upvotes: i.upvotes + 1 }
                        : i
                );
                setIssues(updated);
            })
            .catch(err => {
                alert(err.response?.data?.message || "Failed to Upvote");
            });
    };

    // FILTER + SEARCH LOGIC
    const filtered = issues.filter((item) => {
        return (
            (categoryFilter ? item.category === categoryFilter : true) &&
            (statusFilter ? item.status === statusFilter : true) &&
            (priorityFilter ? item.priority === priorityFilter : true) &&
            (search ? item.title.toLowerCase().includes(search.toLowerCase()) : true)
        );
    });

    if (loading) {
        return (
            <motion.div 
                className="flex flex-col items-center justify-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mb-4"
                />
                <motion.p 
                    className="text-center text-lg text-gray-600"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Loading Issues...
                </motion.p>
            </motion.div>
        );
    }

    return (
        <motion.div 
            className="px-6 py-10 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
                <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-10 left-1/2 w-64 h-64 bg-gradient-to-r from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-block mb-4"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold">
                            🔍 Browse Issues
                        </span>
                    </motion.div>
                    
                    <motion.h1 
                        ref={headerRef}
                        className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-400 text-transparent bg-clip-text mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        All Issues
                    </motion.h1>
                    
                    <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                    
                    <motion.p 
                        className="text-gray-600 max-w-2xl mx-auto text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Discover and track community-reported issues. Filter by category, status, and priority to find what matters to you.
                    </motion.p>
                </motion.div>

                {/* FILTERS */}
                <motion.div 
                    ref={filtersRef}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <motion.h2 
                        className="text-xl font-bold text-gray-800 mb-6 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        🎯 Filter & Search
                    </motion.h2>
                    
                    <div className="grid md:grid-cols-4 gap-6">
                        <motion.div 
                            className="relative"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search issues..."
                                className="border-2 border-gray-200 pl-12 pr-4 py-3 rounded-2xl w-full focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </motion.div>

                        <motion.select
                            className="border-2 border-gray-200 px-4 py-3 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            whileHover={{ scale: 1.02 }}
                            whileFocus={{ scale: 1.02 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <option value="">🏗️ All Categories</option>
                            <option value="Infrastructure">🏗️ Infrastructure</option>
                            <option value="Environment">🌱 Environment</option>
                            <option value="Utilities">⚡ Utilities</option>
                            <option value="Safety">🛡️ Safety</option>
                            <option value="Transport">🚗 Transport</option>
                        </motion.select>

                        <motion.select
                            className="border-2 border-gray-200 px-4 py-3 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                            onChange={(e) => setStatusFilter(e.target.value)}
                            whileHover={{ scale: 1.02 }}
                            whileFocus={{ scale: 1.02 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        >
                            <option value="">📊 All Status</option>
                            <option value="Pending">⏳ Pending</option>
                            <option value="In Progress">🔄 In Progress</option>
                            <option value="Resolved">✅ Resolved</option>
                        </motion.select>

                        <motion.select
                            className="border-2 border-gray-200 px-4 py-3 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            whileHover={{ scale: 1.02 }}
                            whileFocus={{ scale: 1.02 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                        >
                            <option value="">🎯 All Priority</option>
                            <option value="High">🔴 High Priority</option>
                            <option value="Normal">🟡 Normal Priority</option>
                        </motion.select>
                    </div>
                </motion.div>

                {/* GRID */}
                <motion.div 
                    ref={gridRef}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                <AnimatePresence>
                    {filtered.map((issue, index) => (
                        <motion.div
                            key={issue._id}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -50, scale: 0.9 }}
                            transition={{ 
                                delay: index * 0.1, 
                                duration: 0.6,
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={{ 
                                y: -15, 
                                scale: 1.02,
                            }}
                            className="group rounded-3xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden modern-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                <motion.img
                                    src={issue.image}
                                    alt={issue.title}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                />

                                <motion.div 
                                    className="absolute top-3 left-3 flex gap-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <motion.span
                                        className={`px-3 py-1 text-xs font-semibold rounded-full ${issue.priority === "High"
                                            ? "bg-red-500 text-white"
                                            : "bg-yellow-500 text-white"
                                            }`}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {issue.priority} Priority
                                    </motion.span>
                                </motion.div>

                                <motion.span 
                                    className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-white text-gray-700 shadow"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {issue.status}
                                </motion.span>
                            </div>

                            <motion.div 
                                className="p-5 space-y-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <motion.h2 
                                    className="text-lg text-left font-bold text-gray-800 leading-tight"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    {issue.title}
                                </motion.h2>

                                <motion.div 
                                    className="flex justify-between items-center"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
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
                                        <span>📍</span>
                                        <span>{issue.location}</span>
                                    </motion.div>
                                </motion.div>

                                <div className="border-t border-gray-200"></div>

                                <motion.div 
                                    className="flex items-center justify-between pt-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
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
                                        {issue.upvotes}
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
            </div>
        </motion.div>
    );
};

export default AllIssues;
