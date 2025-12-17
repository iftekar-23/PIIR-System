// src/pages/Dashboard/Citizen/MyIssues.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import {
  Pencil,
  Trash2,
  Eye,
  RefreshCcw,
  Filter,
  MapPin,
} from "lucide-react";

/* -------------------- Status Badge -------------------- */
const StatusBadge = ({ status }) => {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Working: "bg-indigo-100 text-indigo-700",
    Resolved: "bg-green-100 text-green-700",
    Closed: "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full font-medium ${
        colors[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};

/* -------------------- Issue Card -------------------- */
const IssueCard = ({ issue, onEditClick, onDelete }) => (
  <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h3 className="font-semibold text-lg text-gray-800">
          {issue.title}
        </h3>
        <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500">
          <span>{issue.category}</span>
          <StatusBadge status={issue.status} />
          {issue.location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {issue.location}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Edit only when Pending */}
        <button
          disabled={issue.status !== "Pending"}
          onClick={() => onEditClick(issue)}
          className={`p-2 rounded-lg border hover:bg-gray-50 ${
            issue.status !== "Pending"
              ? "opacity-40 cursor-not-allowed"
              : ""
          }`}
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => onDelete(issue._id)}
          className="p-2 rounded-lg border hover:bg-red-50 text-red-600"
        >
          <Trash2 size={16} />
        </button>

        <a
          href={`/issue/${issue._id}`}
          className="p-2 rounded-lg border hover:bg-gray-50"
        >
          <Eye size={16} />
        </a>
      </div>
    </div>
  </div>
);

/* -------------------- Page -------------------- */
const MyIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState({ status: "", category: "" });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  /* ---------------- Fetch ---------------- */
  const fetchIssues = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(
        `/issues?userEmail=${user.email}`
      );
      setIssues(res.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.email) fetchIssues();
  }, [user]);

  /* ---------------- Delete ---------------- */
  const handleDelete = async (id) => {
    const ok = await Swal.fire({
      title: "Delete this issue?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (!ok.isConfirmed) return;

    const prev = issues;
    setIssues(prev.filter((i) => i._id !== id));

    try {
      await axiosSecure.delete(`/issues/${id}`);
      Swal.fire("Deleted", "Issue removed successfully", "success");
    } catch (err) {
      setIssues(prev);
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  /* ---------------- Edit ---------------- */
  const openEdit = (issue) => {
    setEditing(issue);
    reset({
      title: issue.title,
      description: issue.description,
      category: issue.category,
      location: issue.location,
      imageURL: issue.imageURL,
    });
  };

  const onEditSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(
        `/issues/${editing._id}`,
        data
      );

      setIssues((prev) =>
        prev.map((i) =>
          i._id === editing._id ? res.data.issue : i
        )
      );

      setEditing(null);
      Swal.fire("Updated", "Issue updated successfully", "success");
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  /* ---------------- Filter ---------------- */
  const displayed = issues.filter(
    (i) =>
      (!filter.status || i.status === filter.status) &&
      (!filter.category || i.category === filter.category)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          My Issues
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage and track all your reported issues
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-4 flex flex-wrap gap-3 items-center">
        <Filter size={18} className="text-gray-500" />

        <select
          value={filter.status}
          onChange={(e) =>
            setFilter({ ...filter, status: e.target.value })
          }
          className="p-2 border rounded-lg"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Working">Working</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={filter.category}
          onChange={(e) =>
            setFilter({ ...filter, category: e.target.value })
          }
          className="p-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="Road">Road</option>
          <option value="Water">Water</option>
          <option value="Garbage">Garbage</option>
        </select>

        <button
          onClick={fetchIssues}
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <RefreshCcw size={16} />
          Refresh
        </button>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading issues...</p>
      ) : displayed.length === 0 ? (
        <div className="text-center text-gray-500 py-12 bg-white rounded-xl border">
          No issues found
        </div>
      ) : (
        <div className="grid gap-4">
          {displayed.map((issue) => (
            <IssueCard
              key={issue._id}
              issue={issue}
              onEditClick={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h3 className="font-bold text-lg mb-4">
              Edit Issue
            </h3>

            <form
              onSubmit={handleSubmit(onEditSubmit)}
              className="space-y-3"
            >
              <input
                {...register("title")}
                className="w-full p-2 border rounded-lg"
                placeholder="Title"
              />
              <textarea
                {...register("description")}
                className="w-full p-2 border rounded-lg"
                placeholder="Description"
              />
              <input
                {...register("category")}
                className="w-full p-2 border rounded-lg"
                placeholder="Category"
              />
              <input
                {...register("location")}
                className="w-full p-2 border rounded-lg"
                placeholder="Location"
              />

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIssues;
