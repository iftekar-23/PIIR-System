import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminPayments = () => {
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [filterMonth, setFilterMonth] = useState("");

  const fetchPayments = async () => {
    const res = await axiosSecure.get("/admin/payments");
    setPayments(res.data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(p => {
    if (!filterMonth) return true;
    const month = new Date(p.createdAt).toISOString().slice(0,7); // yyyy-mm
    return month === filterMonth;
  });

  return (
    <div className="bg-white shadow rounded-lg p-5 space-y-4">
      <h2 className="text-xl font-bold">Payments</h2>

      <div className="flex gap-2 items-center">
        <label>Filter by Month:</label>
        <input
          type="month"
          className="border p-1 rounded"
          value={filterMonth}
          onChange={e => setFilterMonth(e.target.value)}
        />
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">User Email</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map(p => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="p-2 border">{p.userEmail}</td>
              <td className="p-2 border">${p.amount}</td>
              <td className="p-2 border capitalize">{p.status}</td>
              <td className="p-2 border">{new Date(p.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayments;
