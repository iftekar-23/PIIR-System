// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   FaExclamationCircle,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaMoneyBillWave,
// } from "react-icons/fa";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// /* ================= STAT CARD ================= */
// const StatCard = ({ icon, title, value, color }) => (
//   <motion.div
//     whileHover={{ y: -5 }}
//     transition={{ type: "spring", stiffness: 200 }}
//     className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md flex items-center gap-4"
//   >
//     <div className={`text-3xl ${color}`}>{icon}</div>
//     <div>
//       <p className="text-sm text-gray-500">{title}</p>
//       <p className="text-2xl font-semibold text-gray-800">{value}</p>
//     </div>
//   </motion.div>
// );

// /* ================= TABLE CONTAINER ================= */
// const TableCard = ({ title, children }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 15 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.4 }}
//     className="bg-white border border-gray-200 rounded-xl shadow-sm"
//   >
//     <div className="px-6 py-4 border-b">
//       <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
//     </div>
//     <div className="overflow-x-auto">{children}</div>
//   </motion.div>
// );

// /* ================= ADMIN HOME ================= */
// const AdminHome = () => {
//   const axiosSecure = useAxiosSecure();
//   const [stats, setStats] = useState({});
//   const [latestIssues, setLatestIssues] = useState([]);
//   const [latestPayments, setLatestPayments] = useState([]);
//   const [latestUsers, setLatestUsers] = useState([]);

//   useEffect(() => {
//     axiosSecure.get("/admin/dashboard/stats").then(res => setStats(res.data));
//     axiosSecure.get("/admin/issues").then(res => setLatestIssues(res.data.slice(0, 5)));
//     axiosSecure.get("/admin/payments").then(res => setLatestPayments(res.data.slice(0, 5)));
//     axiosSecure.get("/admin/users").then(res => setLatestUsers(res.data.slice(0, 5)));
//   }, [axiosSecure]);

//   return (
//     <div className="space-y-8">
//       {/* HEADER */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
//         <p className="text-gray-500">Overview of system activity</p>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//         <StatCard
//           icon={<FaExclamationCircle />}
//           title="Total Issues"
//           value={stats.totalIssues || 0}
//           color="text-blue-600"
//         />
//         <StatCard
//           icon={<FaCheckCircle />}
//           title="Resolved Issues"
//           value={stats.resolvedIssues || 0}
//           color="text-green-600"
//         />
//         <StatCard
//           icon={<FaTimesCircle />}
//           title="Rejected Issues"
//           value={stats.rejectedIssues || 0}
//           color="text-red-600"
//         />
//         <StatCard
//           icon={<FaMoneyBillWave />}
//           title="Total Payments"
//           value={`৳ ${stats.totalPayments || 0}`}
//           color="text-purple-600"
//         />
//       </div>

//       {/* ================= LATEST ISSUES ================= */}
//       <TableCard title="Latest Issues">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 text-gray-600">
//             <tr>
//               <th className="px-5 py-3 text-center">Title</th>
//               <th className="px-5 py-3">Category</th>
//               <th className="px-5 py-3">Status</th>
//               <th className="px-5 py-3">Priority</th>
//               <th className="px-5 py-3">Assigned</th>
//             </tr>
//           </thead>
//           <tbody>
//             {latestIssues.map(issue => (
//               <tr
//                 key={issue._id}
//                 className="border-t hover:bg-gray-50 transition"
//               >
//                 <td className="px-5 py-3 font-medium text-gray-800">
//                   {issue.title}
//                 </td>
//                 <td className="px-5 py-3 capitalize">{issue.category}</td>
//                 <td className="px-5 py-3">
//                   <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
//                     {issue.status}
//                   </span>
//                 </td>
//                 <td className="px-5 py-3 capitalize">{issue.priority}</td>
//                 <td className="px-5 py-3">
//                   {issue.assignedTo || "Unassigned"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </TableCard>

//       {/* ================= PAYMENTS ================= */}
//       <TableCard title="Latest Payments">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 text-gray-600">
//             <tr>
//               <th className="px-5 py-3 text-center">User</th>
//               <th className="px-5 py-3">Amount</th>
//               <th className="px-5 py-3">Status</th>
//               <th className="px-5 py-3">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {latestPayments.map(p => (
//               <tr
//                 key={p._id}
//                 className="border-t hover:bg-gray-50 transition"
//               >
//                 <td className="px-5 py-3">{p.userEmail}</td>
//                 <td className="px-5 py-3 font-semibold">৳ {p.amount}</td>
//                 <td className="px-5 py-3 capitalize">{p.status}</td>
//                 <td className="px-5 py-3 text-gray-500">
//                   {new Date(p.createdAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </TableCard>

//       {/* ================= USERS ================= */}
//       <TableCard title="Latest Users">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 text-gray-600">
//             <tr>
//               <th className="px-5 py-3 text-center">Name</th>
//               <th className="px-5 py-3">Email</th>
//               <th className="px-5 py-3">Phone</th>
//             </tr>
//           </thead>
//           <tbody>
//             {latestUsers.map(u => (
//               <tr
//                 key={u._id}
//                 className="border-t hover:bg-gray-50 transition"
//               >
//                 <td className="px-5 py-3 font-medium">{u.name}</td>
//                 <td className="px-5 py-3">{u.email}</td>
//                 <td className="px-5 py-3">{u.phone || "—"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </TableCard>
//     </div>
//   );
// };

// export default AdminHome;
