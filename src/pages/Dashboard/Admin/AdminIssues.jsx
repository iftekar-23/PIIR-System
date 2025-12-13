import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserPlus, FaTimes } from "react-icons/fa";

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
    <div className="bg-white shadow rounded-lg p-5">
      <h2 className="text-xl font-bold mb-4">All Issues</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Assigned Staff</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(issue => (
            <tr key={issue._id} className="hover:bg-gray-50">
              <td className="p-2 border">{issue.title}</td>
              <td className="p-2 border">{issue.category}</td>
              <td className="p-2 border capitalize">{issue.status}</td>
              <td className="p-2 border capitalize">{issue.priority}</td>
              <td className="p-2 border">{issue.assignedTo || "-"}</td>
              <td className="p-2 border flex gap-2">
                {!issue.assignedTo && (
                  <button
                    onClick={() => setAssignModal({ open: true, issueId: issue._id })}
                    className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    <FaUserPlus /> Assign
                  </button>
                )}
                {issue.status === "pending" && (
                  <button
                    onClick={() => rejectIssue(issue._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    <FaTimes /> Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ASSIGN STAFF MODAL */}
      {assignModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Assign Staff</h3>
            <select
              className="w-full p-2 border rounded mb-4"
              onChange={(e) => assignStaff(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Select Staff</option>
              {staffList.map(staff => (
                <option key={staff.email} value={staff.email}>{staff.name} ({staff.email})</option>
              ))}
            </select>
            <button
              className="bg-gray-400 px-3 py-1 rounded"
              onClick={() => setAssignModal({ open: false, issueId: null })}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminIssues;
