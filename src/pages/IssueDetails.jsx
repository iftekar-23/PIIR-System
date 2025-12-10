// src/pages/IssueDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaUserCircle, FaTrash, FaEdit, FaBolt } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const IssueDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [issue, setIssue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [boosting, setBoosting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get(`/issues/${id}`)
            .then((res) => {
                setIssue(res.data || {});
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, [id, axiosSecure]);

    const isOwner = issue?.userEmail === user?.email;

    const handleDelete = async () => {
        if (!isOwner) return alert("Only the submitter can delete this issue.");
        if (!window.confirm("Delete this issue? This action cannot be undone.")) return;

        try {
            setDeleting(true);
            const res = await axiosSecure.delete(`/issues/${id}`);
            if (res?.data?.deletedCount) {
                alert("Issue deleted");
                navigate("/issues");
            } else {
                alert("Delete failed");
            }
        } catch (err) {
            console.error(err);
            alert("Delete failed");
        } finally {
            setDeleting(false);
        }
    };

    // start Stripe checkout for boost
    const handleBoost = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
        if (issue?.priority === "high" || issue?.priority === "High") {
            alert("Issue already boosted.");
            return;
        }

        try {
            setBoosting(true);
            const res = await axiosSecure.post("/boost-issue", {
                issueId: id,
                userEmail: user.email,
            });

            if (res.data?.url) {
                // redirect to Stripe checkout
                window.location.href = res.data.url;
            } else {
                alert("Failed to start payment session.");
            }
        } catch (err) {
            console.error(err);
            alert("Payment failed to start.");
        } finally {
            setBoosting(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading issue...</div>;
    if (!issue?._id) return <div className="p-8 text-center">Issue not found</div>;

    // nicely normalize priority/status for display
    const priority = (issue.priority || "").toString();
    const status = (issue.status || "").toString();

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{issue.title}</h1>
                    <p className="text-gray-600 mt-1">
                        Submitted by <span className="font-medium">{issue.userEmail || "Unknown"}</span> •{" "}
                        <span className="text-sm text-gray-500">ID: {issue._id}</span>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${priority.toLowerCase() === "high" ? "bg-red-600 text-white" : "bg-yellow-400 text-black"
                            }`}
                    >
                        {priority ? `${priority} Priority` : "Priority: N/A"}
                    </span>

                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">
                        {status || "Status: N/A"}
                    </span>
                </div>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: image & meta */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border">
                        <img
                            src={issue.image || "https://via.placeholder.com/1200x600?text=No+Image"}
                            alt={issue.title}
                            className="w-full h-72 md:h-96 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-3">Description</h2>
                            <p className="text-gray-700 whitespace-pre-line">
                                {issue.details || issue.description || "No description provided."}
                            </p>

                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="p-4 bg-gray-50 rounded-lg border">
                                    <p className="text-sm text-gray-500">Category</p>
                                    <p className="font-medium">{issue.category || "N/A"}</p>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg border">
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="font-medium">{issue.location || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* timeline */}
                    <div className="bg-white rounded-xl shadow-md p-6 border">
                        <h3 className="text-xl font-semibold mb-4">Timeline</h3>
                        {issue.timeline && issue.timeline.length ? (
                            <ul className="space-y-3">
                                {issue.timeline.map((t, i) => (
                                    <li key={i} className="p-3 rounded-lg bg-gray-50 border">
                                        <div className="flex items-start gap-3">
                                            <div className="pt-1">
                                                <FaUserCircle className="text-gray-400" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-800">{t.action}</div>
                                                <div className="text-xs text-gray-500">
                                                    Updated by: {t.updatedBy}
                                                </div>
                                                <div className="text-xs text-gray-400">{new Date(t.date).toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </li>

                                ))}
                            </ul>
                        ) : (
                            <div className="text-gray-500">No timeline events yet.</div>
                        )}
                    </div>
                </div>

                {/* Right: staff + actions */}
                <div className="space-y-6">
                    {/* Staff card */}
                    <div className="bg-white rounded-xl shadow-md p-6 border">
                        <h4 className="text-lg font-semibold mb-3">Assigned Staff</h4>
                        {issue.assignedStaff ? (
                            <div className="flex gap-3 items-center">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl text-gray-600">
                                    {issue.assignedStaff?.name?.[0] || "S"}
                                </div>
                                <div>
                                    <div className="font-medium">{issue.assignedStaff?.name}</div>
                                    <div className="text-sm text-gray-500">{issue.assignedStaff?.email}</div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">No staff assigned yet.</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-xl shadow-md p-6 border flex flex-col gap-3">
                        <h4 className="text-lg font-semibold">Actions</h4>

                        {/* Edit / Delete for owner */}
                        <div className="flex gap-2">
                            {isOwner && issue.status?.toLowerCase() === "pending" && (
                                <button
                                    onClick={() => navigate(`/issues/edit/${id}`)}
                                    className="flex-1 inline-flex items-center gap-2 justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                >
                                    <FaEdit /> Edit
                                </button>
                            )}

                            {isOwner && (
                                <button
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                    <FaTrash /> {deleting ? "Deleting..." : "Delete"}
                                </button>
                            )}
                        </div>

                        {/* Boost action */}
                        <button
                            onClick={handleBoost}
                            disabled={boosting || issue.priority?.toLowerCase() === "high"}
                            className={`w-full inline-flex items-center gap-3 px-4 py-3 justify-center rounded-lg text-white font-medium transition ${issue.priority?.toLowerCase() === "high"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-purple-600 hover:bg-purple-700"
                                }`}
                        >
                            <FaBolt />
                            {issue.priority?.toLowerCase() === "high" ? "Boosted" : boosting ? "Redirecting to payment..." : "Boost Issue (100 TK)"}
                        </button>

                        <div className="text-xs text-gray-500 pt-2">
                            Boost sets priority to <strong>High</strong> and adds a timeline record after confirmed payment.
                        </div>
                    </div>

                    {/* quick meta */}
                    <div className="bg-white rounded-xl shadow-md p-4 border text-sm text-gray-600">
                        <div className="mb-1"><strong>Upvotes:</strong> {issue.upvotes || 0}</div>
                        <div className="mb-1"><strong>Created:</strong> {new Date(issue.createdAt).toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueDetails;
