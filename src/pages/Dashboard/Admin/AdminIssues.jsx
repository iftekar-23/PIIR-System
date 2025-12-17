import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserPlus, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AdminIssues = () => {
  const axiosSecure = useAxiosSecure();
  const [issues, setIssues] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [assignModal, setAssignModal] = useState({ open: false, issueId: null });

  const fetchIssues = async () => {
    const res = await axiosSecure.get("/admin/issues");
    setIssues(res.data);
  };

  const fetchStaff = async () => {
    const res = await axiosSecure.get("/admin/staff");
    setStaffList(res.data);
  };

  useEffect(() => {
    fetchIssues();
    fetchStaff();
  }, []);

  const assignStaff = async (staffEmail) => {
    await axiosSecure.patch(`/admin/issues/${assignModal.issueId}/assign`, { staffEmail });
    setAssignModal({ open: false, issueId: null });
    fetchIssues();
  };

  const rejectIssue = async (issueId) => {
    if (window.confirm("Are you sure you want to reject this issue?")) {
      await axiosSecure.patch(`/admin/issues/${issueId}/reject`);
      fetchIssues();
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Issue Management</h2>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-center">Title</th>
                <th className="px-4 py-3 text-center">Category</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Priority</th>
                <th className="px-4 py-3 text-center">Assigned</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium">{issue.title}</td>
                  <td className="px-4 py-3">{issue.category}</td>
                  <td className="px-4 py-3 capitalize">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      issue.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : issue.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 capitalize">{issue.priority}</td>
                  <td className="px-4 py-3">{issue.assignedTo || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2 flex-wrap">
                      {!issue.assignedTo && (
                        <button
                          onClick={() => setAssignModal({ open: true, issueId: issue._id })}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                          <FaUserPlus /> Assign
                        </button>
                      )}
                      {issue.status === "pending" && (
                        <button
                          onClick={() => rejectIssue(issue._id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                        >
                          <FaTimes /> Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ASSIGN MODAL */}
      <AnimatePresence>
        {assignModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Assign Staff</h3>

              <select
                className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
                onChange={(e) => assignStaff(e.target.value)}
              >
                <option value="" disabled>Select a staff member</option>
                {staffList.map((staff) => (
                  <option key={staff.email} value={staff.email}>
                    {staff.name} ({staff.email})
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setAssignModal({ open: false, issueId: null })}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminIssues;