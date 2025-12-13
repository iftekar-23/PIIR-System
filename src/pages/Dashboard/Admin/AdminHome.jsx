import React, { useEffect, useState } from "react";
import { FaUsers, FaExclamationCircle, FaCheck, FaTimes, FaMoneyBill } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const StatCard = ({ icon, title, value, color }) => (
  <div className={`bg-white shadow rounded-lg p-5 flex items-center gap-4`}>
    <div className={`text-3xl ${color}`}>{icon}</div>
    <div>
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({});
  const [latestIssues, setLatestIssues] = useState([]);
  const [latestPayments, setLatestPayments] = useState([]);
  const [latestUsers, setLatestUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/dashboard/stats").then(res => setStats(res.data));
    axiosSecure.get("/admin/issues").then(res => setLatestIssues(res.data.slice(0, 5)));
    axiosSecure.get("/admin/payments").then(res => setLatestPayments(res.data.slice(0, 5)));
    axiosSecure.get("/admin/users").then(res => setLatestUsers(res.data.slice(0, 5)));
  }, [axiosSecure]);

  return (
    <div className="space-y-6">
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard icon={<FaExclamationCircle />} title="Total Issues" value={stats.totalIssues || 0} color="text-blue-500" />
        <StatCard icon={<FaTimes />} title="Pending Issues" value={stats.pendingIssues || 0} color="text-yellow-500" />
        <StatCard icon={<FaCheck />} title="Resolved Issues" value={stats.resolvedIssues || 0} color="text-green-500" />
        <StatCard icon={<FaTimes />} title="Rejected Issues" value={stats.rejectedIssues || 0} color="text-red-500" />
        <StatCard icon={<FaMoneyBill />} title="Total Payments" value={`$${stats.totalPayments || 0}`} color="text-purple-500" />
      </div>

      {/* LATEST ISSUES */}
      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-xl font-bold mb-3">Latest Issues</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Priority</th>
              <th className="p-2 border">Assigned Staff</th>
            </tr>
          </thead>
          <tbody>
            {latestIssues.map(issue => (
              <tr key={issue._id} className="hover:bg-gray-50">
                <td className="p-2 border">{issue.title}</td>
                <td className="p-2 border">{issue.category}</td>
                <td className="p-2 border capitalize">{issue.status}</td>
                <td className="p-2 border capitalize">{issue.priority}</td>
                <td className="p-2 border">{issue.assignedTo || "Not assigned"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LATEST PAYMENTS */}
      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-xl font-bold mb-3">Latest Payments</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">User</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {latestPayments.map(payment => (
              <tr key={payment._id} className="hover:bg-gray-50">
                <td className="p-2 border">{payment.userEmail}</td>
                <td className="p-2 border">${payment.amount}</td>
                <td className="p-2 border capitalize">{payment.status}</td>
                <td className="p-2 border">{new Date(payment.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LATEST USERS */}
      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-xl font-bold mb-3">Latest Users</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
            </tr>
          </thead>
          <tbody>
            {latestUsers.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
