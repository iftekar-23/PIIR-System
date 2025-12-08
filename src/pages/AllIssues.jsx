import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const AllIssues = () => {
    const data = useLoaderData();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");

    const loggedUser = "aiftekar798@gmail.com";

    const handleUpvote = (issue) => {
        if (!loggedUser) return navigate("/login");

        if (issue.userEmail === loggedUser) {
            alert("You cannot upvote your own issue!");
            return;
        }

        alert("Upvoted Successfully! (Connect DB later)");
    };

    // FILTER + SEARCH LOGIC
    const filtered = data.filter((item) => {
        return (
            (categoryFilter ? item.category === categoryFilter : true) &&
            (statusFilter ? item.status === statusFilter : true) &&
            (priorityFilter ? item.priority === priorityFilter : true) &&
            (search ? item.title.toLowerCase().includes(search.toLowerCase()) : true)
        );
    });

    return (
        <div className="px-6 py-10">
            <h1 className="text-4xl font-bold text-center mb-8">All Issues</h1>

            {/* FILTERS */}
            <div className="grid md:grid-cols-4 gap-4 mb-10">
                <input
                    type="text"
                    placeholder="Search issue..."
                    className="border px-4 py-2 rounded-md"
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="border px-4 py-2 rounded-md"
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="">Filter by Category</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Environment">Environment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Safety">Safety</option>
                    <option value="Transport">Transport</option>
                </select>

                <select
                    className="border px-4 py-2 rounded-md"
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">Filter by Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>

                <select
                    className="border px-4 py-2 rounded-md"
                    onChange={(e) => setPriorityFilter(e.target.value)}
                >
                    <option value="">Filter by Priority</option>
                    <option value="High">High</option>
                    <option value="Normal">Normal</option>
                </select>
            </div>

            {/* GRID */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((issue, index) => (
                    <motion.div
                        key={issue.id}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="group rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                        {/* IMAGE */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <img
                                src={issue.image}
                                alt={issue.title}
                                className="w-full h-full object-cover group-hover:scale-105 duration-500"
                            />

                            {/* TAGS ON IMAGE */}
                            <div className="absolute top-3 left-3 flex gap-2">
                                <span
                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${issue.priority === "High"
                                        ? "bg-red-500 text-white"
                                        : "bg-yellow-500 text-white"
                                        }`}
                                >
                                    {issue.priority} Priority
                                </span>
                            </div>

                            <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-white text-gray-700 shadow">
                                {issue.status}
                            </span>
                        </div>

                        {/* CARD BODY */}
                        <div className="p-5 space-y-3">

                            {/* TITLE */}
                            <h2 className="text-lg text-left font-bold text-gray-800 leading-tight">
                                {issue.title}
                            </h2>

                            <div className="flex justify-between items-center">
                                {/* CATEGORY */}
                                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {issue.category}
                                </span>

                                {/* LOCATION */}
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                    <span>📍</span>
                                    <span>{issue.location}</span>
                                </div>
                            </div>

                            {/* DIVIDER */}
                            <div className="border-t border-gray-200"></div>

                            {/* FOOTER: FLEX LAYOUT */}
                            <div className="flex items-center justify-between pt-2">
                                <button
                                    onClick={() => handleUpvote(issue)}
                                    className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800"
                                >
                                    <FaArrowUp className="text-lg" />
                                    {issue.upvotes}
                                </button>

                                <button
                                    onClick={() => navigate(`/issue/${issue.id}`)}
                                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-medium"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AllIssues;
