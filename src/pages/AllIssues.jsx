import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp, FaSearch, FaFilter, FaChevronLeft, FaChevronRight } from "react-icons/fa";
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

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9); // 3x3 grid

    const { user } = useAuth();
    
    const headerRef = useRef(null);
    const filtersRef = useRef(null);
    const gridRef = useRef(null);
    const paginationRef = useRef(null);

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

    // PAGINATION LOGIC
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentIssues = filtered.slice(startIndex, endIndex);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, categoryFilter, statusFilter, priorityFilter]);

    // Pagination handlers
    const goToPage = (page) => {
        setCurrentPage(page);
        // Smooth scroll to top of grid
        if (gridRef.current) {
            gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const goToPrevious = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    const goToNext = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

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
                <AnimatePresence mode="wait">
                    {currentIssues.map((issue, index) => (
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

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <motion.div 
                        ref={paginationRef}
                        className="mt-16 flex justify-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
                            <div className="flex items-center gap-2">
                                {/* Previous Button */}
                                <motion.button
                                    onClick={goToPrevious}
                                    disabled={currentPage === 1}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                                        currentPage === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                    }`}
                                    whileHover={currentPage === 1 ? {} : { scale: 1.05, y: -2 }}
                                    whileTap={currentPage === 1 ? {} : { scale: 0.95 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.9 }}
                                >
                                    <FaChevronLeft className="text-sm" />
                                    Previous
                                </motion.button>

                                {/* Page Numbers */}
                                <div className="flex items-center gap-1 mx-4">
                                    {getPageNumbers().map((page, index) => (
                                        <motion.div
                                            key={`${page}-${index}`}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                        >
                                            {page === '...' ? (
                                                <span className="px-3 py-2 text-gray-500">...</span>
                                            ) : (
                                                <motion.button
                                                    onClick={() => goToPage(page)}
                                                    className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
                                                        currentPage === page
                                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                                                    }`}
                                                    whileHover={{ 
                                                        scale: 1.1,
                                                        y: -2,
                                                        boxShadow: currentPage === page 
                                                            ? "0 10px 25px rgba(59, 130, 246, 0.3)"
                                                            : "0 5px 15px rgba(0, 0, 0, 0.1)"
                                                    }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    {page}
                                                </motion.button>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Next Button */}
                                <motion.button
                                    onClick={goToNext}
                                    disabled={currentPage === totalPages}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                                        currentPage === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                    }`}
                                    whileHover={currentPage === totalPages ? {} : { scale: 1.05, y: -2 }}
                                    whileTap={currentPage === totalPages ? {} : { scale: 0.95 }}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.9 }}
                                >
                                    Next
                                    <FaChevronRight className="text-sm" />
                                </motion.button>
                            </div>

                            {/* Results Info */}
                            <motion.div 
                                className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1 }}
                            >
                                <div className="text-sm text-gray-600 text-center sm:text-left">
                                    Showing {startIndex + 1}-{Math.min(endIndex, filtered.length)} of {filtered.length} issues
                                    {(search || categoryFilter || statusFilter || priorityFilter) && (
                                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                            Filtered
                                        </span>
                                    )}
                                </div>
                                
                                {/* Quick Jump */}
                                {totalPages > 5 && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-600">Jump to:</span>
                                        <motion.select
                                            value={currentPage}
                                            onChange={(e) => goToPage(parseInt(e.target.value))}
                                            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <option key={page} value={page}>
                                                    Page {page}
                                                </option>
                                            ))}
                                        </motion.select>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* No Results Message */}
                {filtered.length === 0 && !loading && (
                    <motion.div 
                        className="text-center py-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="text-6xl mb-4"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            🔍
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Issues Found</h3>
                        <p className="text-gray-600 mb-6">
                            Try adjusting your search criteria or filters to find more results.
                        </p>
                        <motion.button
                            onClick={() => {
                                setSearch("");
                                setCategoryFilter("");
                                setStatusFilter("");
                                setPriorityFilter("");
                                setCurrentPage(1);
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Clear All Filters
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default AllIssues;
