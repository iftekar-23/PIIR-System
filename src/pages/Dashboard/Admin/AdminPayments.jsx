// import React, { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { FaMoneyBillWave } from "react-icons/fa";

// const AdminPayments = () => {
//   const axiosSecure = useAxiosSecure();
//   const [payments, setPayments] = useState([]);
//   const [filterMonth, setFilterMonth] = useState("");
//   const [loading, setLoading] = useState(true);

//   const fetchPayments = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosSecure.get("/admin/payments");
//       setPayments(res.data || []);
//     } catch (err) {
//       console.error("Failed to load payments", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   const filteredPayments = payments.filter((p) => {
//     if (!filterMonth) return true;
//     const month = new Date(p.createdAt).toISOString().slice(0, 7); // yyyy-mm
//     return month === filterMonth;
//   });

//   return (
//     <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <h2 className="text-2xl font-semibold flex items-center gap-2">
//           <FaMoneyBillWave className="text-green-600" /> Payment History
//         </h2>

//         <div className="flex items-center gap-2">
//           <label className="text-sm font-medium">Filter by Month</label>
//           <input
//             type="month"
//             className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={filterMonth}
//             onChange={(e) => setFilterMonth(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50 text-gray-600">
//             <tr>
//               <th className="px-5 py-3 text-center">User Email</th>
//               <th className="px-5 py-3 text-center">Type</th>
//               <th className="px-5 py-3 text-center">Amount</th>
//               <th className="px-5 py-3 text-center">Status</th>
//               <th className="px-5 py-3 text-center">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan="5" className="text-center py-10 text-gray-500">
//                   Loading payments...
//                 </td>
//               </tr>
//             )}

//             {!loading && filteredPayments.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="text-center py-10 text-gray-500">
//                   No payments found
//                 </td>
//               </tr>
//             )}

//             {filteredPayments.map((p) => (
//               <tr key={p._id} className="border-t hover:bg-gray-50 transition">
//                 <td className="px-5 py-3 font-medium">{p.email || p.userEmail}</td>
//                 <td className="px-5 py-3 capitalize">{p.type || "Issue Boost / Subscription"}</td>
//                 <td className="px-5 py-3 font-semibold">৳{(p.amount / 100) || p.amount}</td>
//                 <td className="px-5 py-3">
//                   <span
//                     className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
//                       p.paymentStatus === "paid" || p.status === "paid"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {p.paymentStatus || p.status || "paid"}
//                   </span>
//                 </td>
//                 <td className="px-5 py-3 text-gray-600">
//                   {new Date(p.createdAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminPayments;