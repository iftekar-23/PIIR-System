// src/pages/Dashboard/Citizen/Profile.jsx
import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { User, Crown, AlertTriangle, CreditCard } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null);

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
  }, [user]);

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

  if (!dbUser) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Blocked Warning */}
      {dbUser.isBlocked && (
        <div className="flex items-center gap-3 bg-red-100 text-red-700 p-4 rounded-xl">
          <AlertTriangle />
          <span>
            You are blocked by admin. Please contact the authorities.
          </span>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <User size={28} className="text-blue-600" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {dbUser.name}
              {dbUser.isPremium && (
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                  <Crown size={14} />
                  Premium
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-500">{dbUser.email}</p>
          </div>
        </div>
      </div>

      {/* Subscription Card */}
      {!dbUser.isPremium && !dbUser.isBlocked && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="text-lg font-semibold">
              Upgrade to Premium
            </h4>
            <p className="text-sm opacity-90">
              Unlimited issue submission & priority support
            </p>
          </div>

          <button
            onClick={handleSubscribe}
            className="flex items-center gap-2 bg-white text-blue-600 px-5 py-2 rounded-lg font-medium hover:bg-gray-100"
          >
            <CreditCard size={16} />
            Subscribe (1000tk)
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
