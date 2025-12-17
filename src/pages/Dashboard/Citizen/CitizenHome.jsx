// src/pages/Dashboard/Citizen/CitizenHome.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FileText,
  Clock,
  RefreshCcw,
  CheckCircle,
  CreditCard,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl shadow-sm border p-5 flex items-center gap-4 hover:shadow-md transition">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="text-white" size={22} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const CitizenHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    payments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(
          `/dashboard/citizen/stats?email=${user.email}`
        );
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchStats();
  }, [user, axiosSecure]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading dashboard...
      </div>
    );

  // Prepare chart data
  const chartData = [
    {
      name: "Total Issues",
      value: stats.total,
    },
    {
      name: "Pending",
      value: stats.pending,
    },
    {
      name: "In Progress",
      value: stats.inProgress,
    },
    {
      name: "Resolved",
      value: stats.resolved,
    },
    {
      name: "Payments",
      value: stats.payments,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome back, {user?.displayName || "Citizen"} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here’s a quick overview of your activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Issues" value={stats.total} icon={FileText} color="bg-blue-600" />
        <StatCard title="Pending" value={stats.pending} icon={Clock} color="bg-yellow-500" />
        <StatCard title="In Progress" value={stats.inProgress} icon={RefreshCcw} color="bg-purple-600" />
        <StatCard title="Resolved" value={stats.resolved} icon={CheckCircle} color="bg-green-600" />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payments Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
              <CreditCard className="text-white" size={20} />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">Payments</h3>
          </div>
          <p className="text-4xl font-bold text-gray-800">{stats.payments}</p>
          <p className="text-sm text-gray-500 mt-1">Successful transactions</p>
        </div>

        {/* Activity Chart */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 lg:col-span-2">
          <h3 className="font-semibold text-gray-800 text-lg mb-3">Activity Overview</h3>
          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4f46e5" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenHome;
