// src/pages/Dashboard/Admin/AdminPayments.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMoneyBillWave, FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AdminPayments = () => {
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/admin/payments")
      .then(res => setPayments(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  const downloadInvoice = (payment) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Payment Invoice", 14, 20);

    // Info
    doc.setFontSize(12);
    doc.text(`Invoice ID: ${payment._id}`, 14, 35);
    doc.text(`Email: ${payment.email || payment.userEmail}`, 14, 43);
    doc.text(
      `Date: ${new Date(payment.createdAt).toLocaleDateString()}`,
      14,
      51
    );

    // Table
    autoTable(doc, {
      startY: 65,
      head: [["Description", "Amount", "Status"]],
      body: [[
        payment.type || "Subscription / Issue Boost",
        `৳${payment.amount / 100 || payment.amount}`,
        payment.paymentStatus || payment.status || "Paid",
      ]],
    });

    // Footer
    doc.text(
      "Thank you for using our service.",
      14,
      doc.lastAutoTable.finalY + 15
    );

    doc.save(`invoice-${payment._id}.pdf`);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <FaMoneyBillWave className="text-green-600" />
        Payment History
      </h2>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  Loading payments...
                </td>
              </tr>
            )}

            {!loading && payments.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  No payments found
                </td>
              </tr>
            )}

            {payments.map(p => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="px-5 py-3">{p.email || p.userEmail}</td>
                <td className="px-5 py-3 font-semibold">
                  ৳{p.amount / 100 || p.amount}
                </td>
                <td className="px-5 py-3">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    Paid
                  </span>
                </td>
                <td className="px-5 py-3">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => downloadInvoice(p)}
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <FaDownload /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayments;
