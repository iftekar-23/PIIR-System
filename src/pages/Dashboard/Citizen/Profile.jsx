// src/pages/Dashboard/Citizen/Profile.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { User, Crown, AlertTriangle, CreditCard, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure.get(`/users/${user.email}`).then(res => {
      setDbUser(res.data);
    });
  }, [user]);

  const handleSubscribe = async () => {
    try {
      const res = await axiosSecure.post("/subscribe", { email: user.email });
      window.location.href = res.data.url;
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const downloadInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Subscription Invoice", 14, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${dbUser.name}`, 14, 35);
    doc.text(`Email: ${dbUser.email}`, 14, 43);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 51);

    autoTable(doc, {
      startY: 65,
      head: [["Plan", "Amount", "Status"]],
      body: [["Premium Subscription", "৳1000", "Paid"]],
    });

    doc.text(
      "Thank you for upgrading to Premium.",
      14,
      doc.lastAutoTable.finalY + 15
    );

    doc.save(`invoice-${dbUser.email}.pdf`);
  };

  if (!dbUser) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {dbUser.isBlocked && (
        <div className="flex items-center gap-3 bg-red-100 text-red-700 p-4 rounded-xl">
          <AlertTriangle />
          You are blocked by admin
        </div>
      )}

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <User size={28} className="text-blue-600" />
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              {dbUser.name}
              {dbUser.isPremium && (
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                  <Crown size={14} /> Premium
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-500">{dbUser.email}</p>
          </div>
        </div>

        {dbUser.isPremium && (
          <button
            onClick={downloadInvoice}
            className="mt-4 flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm"
          >
            <Download size={16} /> Download Invoice
          </button>
        )}
      </div>

      {!dbUser.isPremium && !dbUser.isBlocked && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 flex justify-between items-center">
          <div>
            <h4 className="text-lg font-semibold">Upgrade to Premium</h4>
            <p className="text-sm opacity-90">
              Unlimited issue submission & priority support
            </p>
          </div>

          <button
            onClick={handleSubscribe}
            className="flex items-center gap-2 bg-white text-blue-600 px-5 py-2 rounded-lg font-medium"
          >
            <CreditCard size={16} /> Subscribe (1000tk)
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
