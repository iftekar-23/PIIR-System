import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { User, Crown, AlertTriangle, CreditCard, Download, Receipt, Calendar, DollarSign, History, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null);
  const [userPayments, setUserPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setDbUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [user, axiosSecure]);

  const fetchPaymentHistory = async () => {
    if (!user?.email) return;
    
    setLoadingPayments(true);
    try {
      const res = await axiosSecure.get(`/payments/user/${user.email}`);
      setUserPayments(res.data || []);
    } catch (err) {
      console.error("Failed to load payment history", err);
      Swal.fire("Error", "Failed to load payment history", "error");
    } finally {
      setLoadingPayments(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      const res = await axiosSecure.post("/subscribe", {
        email: user.email,
      });
      window.location.href = res.data.url;
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || err.message,
        "error"
      );
    }
  };

  // Generate comprehensive invoice PDF
  const generateInvoicePDF = (payment = null) => {
    const pdf = new jsPDF();
    
    // Header with gradient effect (simulated with colors)
    pdf.setFillColor(59, 130, 246);
    pdf.rect(0, 0, 210, 40, 'F');
    
    // Company Logo/Title
    pdf.setFontSize(24);
    pdf.setTextColor(255, 255, 255);
    pdf.text("PIIR System", 20, 25);
    
    pdf.setFontSize(12);
    pdf.text("Public Issue & Information Reporting", 20, 32);
    
    // Reset colors
    pdf.setTextColor(0, 0, 0);
    
    // Invoice header
    pdf.setFontSize(20);
    pdf.text(payment ? "Payment Invoice" : "Subscription Invoice", 20, 55);
    
    // Invoice details
    pdf.setFontSize(12);
    const invoiceId = payment ? payment._id.slice(-8).toUpperCase() : `SUB-${Date.now().toString().slice(-8)}`;
    pdf.text(`Invoice ID: ${invoiceId}`, 20, 70);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 78);
    
    // Customer details
    pdf.setFontSize(14);
    pdf.text("Bill To:", 20, 95);
    pdf.setFontSize(12);
    pdf.text(`Name: ${dbUser.name}`, 20, 105);
    pdf.text(`Email: ${dbUser.email}`, 20, 113);
    pdf.text(`Status: ${dbUser.isPremium ? 'Premium Member' : 'Standard Member'}`, 20, 121);
    
    // Service details
    pdf.setFontSize(14);
    pdf.text("Service Details:", 20, 140);
    
    // Table-like structure
    pdf.setFontSize(12);
    pdf.text("Description", 20, 155);
    pdf.text("Amount", 120, 155);
    pdf.text("Status", 160, 155);
    
    // Line separator
    pdf.line(20, 158, 190, 158);
    
    if (payment) {
      pdf.text(payment.type || "Premium Subscription", 20, 170);
      pdf.text(`৳${(payment.amount / 100) || payment.amount}`, 120, 170);
      pdf.text(payment.paymentStatus || payment.status || "Paid", 160, 170);
    } else {
      pdf.text("Premium Subscription", 20, 170);
      pdf.text("৳1000", 120, 170);
      pdf.text("Paid", 160, 170);
    }
    
    // Total
    pdf.line(20, 175, 190, 175);
    pdf.setFontSize(14);
    const totalAmount = payment ? ((payment.amount / 100) || payment.amount) : 1000;
    pdf.text(`Total: ৳${totalAmount}`, 120, 185);
    
    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    pdf.text("Thank you for using PIIR System!", 20, 220);
    pdf.text("For support, contact: support@piir.gov.bd", 20, 230);
    pdf.text("Visit: https://piir.gov.bd", 20, 240);
    
    // Terms
    pdf.text("Terms & Conditions:", 20, 255);
    pdf.text("• This invoice is computer generated and does not require signature", 20, 265);
    pdf.text("• Payment is non-refundable", 20, 275);
    
    const fileName = payment ? `invoice-${payment._id.slice(-8)}.pdf` : `subscription-invoice-${dbUser.email}.pdf`;
    pdf.save(fileName);
  };

  // Generate payment history report
  const generatePaymentReport = () => {
    const pdf = new jsPDF();
    
    // Header
    pdf.setFillColor(59, 130, 246);
    pdf.rect(0, 0, 210, 40, 'F');
    
    pdf.setFontSize(20);
    pdf.setTextColor(255, 255, 255);
    pdf.text("Payment History Report", 20, 25);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text(`Generated for: ${dbUser.name}`, 20, 55);
    pdf.text(`Email: ${dbUser.email}`, 20, 63);
    pdf.text(`Report Date: ${new Date().toLocaleDateString()}`, 20, 71);
    pdf.text(`Total Payments: ${userPayments.length}`, 20, 79);
    
    // Payment list
    let yPos = 95;
    pdf.setFontSize(14);
    pdf.text("Payment History:", 20, yPos);
    yPos += 10;
    
    if (userPayments.length === 0) {
      pdf.setFontSize(12);
      pdf.text("No payment history found.", 20, yPos);
    } else {
      pdf.setFontSize(10);
      pdf.text("Date", 20, yPos);
      pdf.text("Type", 60, yPos);
      pdf.text("Amount", 120, yPos);
      pdf.text("Status", 160, yPos);
      yPos += 5;
      pdf.line(20, yPos, 190, yPos);
      yPos += 10;
      
      userPayments.forEach((payment, index) => {
        if (yPos > 270) {
          pdf.addPage();
          yPos = 30;
        }
        
        pdf.text(new Date(payment.createdAt).toLocaleDateString(), 20, yPos);
        pdf.text(payment.type || "Subscription", 60, yPos);
        pdf.text(`৳${(payment.amount / 100) || payment.amount}`, 120, yPos);
        pdf.text(payment.paymentStatus || payment.status || "Paid", 160, yPos);
        yPos += 8;
      });
    }
    
    pdf.save(`payment-history-${dbUser.email}.pdf`);
  };

  if (!dbUser) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col justify-center items-center h-64 text-gray-500"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"
        />
        <p>Loading your profile...</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Blocked Warning */}
      <AnimatePresence>
        {dbUser.isBlocked && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-3 bg-gradient-to-r from-red-100 to-red-200 text-red-800 p-6 rounded-2xl border border-red-300 shadow-lg"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <AlertTriangle size={24} />
            </motion.div>
            <div>
              <h4 className="font-semibold">Account Blocked</h4>
              <p className="text-sm">You are blocked by admin. Please contact the authorities for assistance.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl border p-8"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg"
          >
            <User size={40} className="text-white" />
          </motion.div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-800">
                {dbUser.name}
              </h3>
              {dbUser.isPremium && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 rounded-full border border-yellow-300 font-semibold"
                >
                  <Crown size={16} />
                  Premium Member
                </motion.span>
              )}
            </div>
            <p className="text-gray-600 mb-4">{dbUser.email}</p>
            
            <div className="flex flex-wrap gap-3">
              {dbUser.isPremium && (
                <motion.button
                  onClick={() => generateInvoicePDF()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  <Download size={16} />
                  Download Invoice
                </motion.button>
              )}
              
              <motion.button
                onClick={() => {
                  setShowPaymentHistory(!showPaymentHistory);
                  if (!showPaymentHistory && userPayments.length === 0) {
                    fetchPaymentHistory();
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                <History size={16} />
                Payment History
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payment History Section */}
      <AnimatePresence>
        {showPaymentHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl shadow-xl border overflow-hidden"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Receipt size={24} />
                  <h3 className="text-xl font-bold">Payment History</h3>
                </div>
                {userPayments.length > 0 && (
                  <motion.button
                    onClick={generatePaymentReport}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
                  >
                    <FileText size={16} />
                    Export PDF
                  </motion.button>
                )}
              </div>
            </div>

            <div className="p-6">
              {loadingPayments ? (
                <div className="flex items-center justify-center py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full mr-3"
                  />
                  <span>Loading payment history...</span>
                </div>
              ) : userPayments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl mb-4"
                  >
                    💳
                  </motion.div>
                  <p className="text-lg font-medium">No payment history found</p>
                  <p className="text-sm">Your payment transactions will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userPayments.map((payment, index) => (
                    <motion.div
                      key={payment._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                          <DollarSign className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {payment.type || "Premium Subscription"}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar size={14} />
                            <span>{new Date(payment.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            ৳{(payment.amount / 100) || payment.amount}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            payment.paymentStatus === "paid" || payment.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {payment.paymentStatus || payment.status || "Paid"}
                          </span>
                        </div>
                        
                        <motion.button
                          onClick={() => generateInvoicePDF(payment)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Download Invoice"
                        >
                          <Download size={16} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subscription Card */}
      <AnimatePresence>
        {!dbUser.isPremium && !dbUser.isBlocked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="text-2xl font-bold mb-2">
                  Upgrade to Premium
                </h4>
                <p className="text-blue-100 text-lg">
                  Unlock unlimited issue submission & priority support
                </p>
                <ul className="mt-4 space-y-2 text-blue-100">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-200 rounded-full"></span>
                    Unlimited issue submissions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-200 rounded-full"></span>
                    Priority customer support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-200 rounded-full"></span>
                    Advanced reporting features
                  </li>
                </ul>
              </div>

              <motion.button
                onClick={handleSubscribe}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <CreditCard size={20} />
                Subscribe Now
                <span className="text-sm bg-blue-100 px-2 py-1 rounded-lg">৳1000</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Profile;