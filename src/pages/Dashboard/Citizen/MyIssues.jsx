// src/pages/Dashboard/Citizen/MyIssues.jsx
import { useEffect, useState } from "react";
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
  Calendar,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------- Status Badge -------------------- */
const StatusBadge = ({ status }) => {
  const colors = {
    Pending: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300",
    "In Progress": "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300",
    Working: "bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 border-indigo-300",
    Resolved: "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300",
    Closed: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300",
  };

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`text-xs px-3 py-1 rounded-full font-semibold border ${
        colors[status] || "bg-gray-100 text-gray-600 border-gray-300"
      }`}
    >
      {status}
    </motion.span>
  );
};

/* -------------------- Issue Card -------------------- */
const IssueCard = ({ issue, onEditClick, onDelete, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -2, scale: 1.01 }}
    className="bg-white rounded-2xl border shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
  >
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-start gap-3 mb-3">
          <motion.div
            whileHover={{ rotate: 5 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0"
          >
            <Tag className="text-white" size={18} />
          </motion.div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
              {issue.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {issue.description}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Tag size={14} />
            <span className="capitalize font-medium">{issue.category}</span>
          </div>
          <StatusBadge status={issue.status} />
          {issue.location && (
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{issue.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          disabled={issue.status !== "Pending"}
          onClick={() => onEditClick(issue)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-xl border-2 transition-all ${
            issue.status !== "Pending"
              ? "opacity-40 cursor-not-allowed border-gray-200"
              : "border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-600"
          }`}
          title={issue.status !== "Pending" ? "Can only edit pending issues" : "Edit issue"}
        >
          <Pencil size={16} />
        </motion.button>

        <motion.button
          onClick={() => onDelete(issue._id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-xl border-2 border-red-200 hover:border-red-400 hover:bg-red-50 text-red-600 transition-all"
          title="Delete issue"
        >
          <Trash2 size={16} />
        </motion.button>

        <motion.a
          href={`/issue/${issue._id}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-xl border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-gray-600 transition-all"
          title="View details"
        >
          <Eye size={16} />
        </motion.a>
      </div>
    </div>
  </motion.div>
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            📋
          </motion.div>
          My Issues
        </h2>
        <p className="text-indigo-100 text-lg mt-2">
          Manage and track all your reported issues
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border shadow-lg p-6"
      >
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-gray-600">
            <Filter size={20} />
            <span className="font-semibold">Filters:</span>
          </div>

          <motion.select
            whileFocus={{ scale: 1.02 }}
            value={filter.status}
            onChange={(e) =>
              setFilter({ ...filter, status: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Working">Working</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </motion.select>

          <motion.select
            whileFocus={{ scale: 1.02 }}
            value={filter.category}
            onChange={(e) =>
              setFilter({ ...filter, category: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">All Categories</option>
            <option value="Road">Road</option>
            <option value="Water">Water</option>
            <option value="Garbage">Garbage</option>
          </motion.select>

          <motion.button
            onClick={fetchIssues}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-auto flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <RefreshCcw size={16} />
            Refresh
          </motion.button>
        </div>
      </motion.div>

      {/* List */}
      <AnimatePresence>
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 text-gray-500"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"
            />
            <p className="text-lg">Loading your issues...</p>
          </motion.div>
        ) : displayed.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl border shadow-lg"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="text-6xl mb-4"
            >
              📝
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No issues found</h3>
            <p className="text-gray-500">Try adjusting your filters or create a new issue</p>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {displayed.map((issue, index) => (
                <IssueCard
                  key={issue._id}
                  issue={issue}
                  onEditClick={openEdit}
                  onDelete={handleDelete}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setEditing(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-bold text-2xl mb-6 text-gray-800">
                Edit Issue
              </h3>

              <form
                onSubmit={handleSubmit(onEditSubmit)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    {...register("title")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Issue title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    {...register("description")}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Detailed description"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <input
                    {...register("category")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Category"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input
                    {...register("location")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Location"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-6">
                  <motion.button
                    type="button"
                    onClick={() => setEditing(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MyIssues;
