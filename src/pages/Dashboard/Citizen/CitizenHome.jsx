// src/pages/Dashboard/Citizen/CitizenHome.jsx
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FileText,
  Clock,
  RefreshCcw,
  CheckCircle,
  CreditCard,
  TrendingUp,
  Activity,
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
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, color, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-white rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-all duration-300 group"
  >
    <div className="flex items-center gap-4">
      <motion.div 
        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}
        whileHover={{ rotate: 5 }}
      >
        <Icon className="text-white" size={24} />
      </motion.div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <motion.p 
          className="text-3xl font-bold text-gray-800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
        >
          {value}
        </motion.p>
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
      <TrendingUp size={14} />
      <span>Active</span>
    </div>
  </motion.div>
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
        <p>Loading your dashboard...</p>
      </motion.div>
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome back, {user?.displayName || "Citizen"} 👋
            </h1>
            <p className="text-blue-100 mt-2 text-lg">
              Here's a quick overview of your activity and impact
            </p>
          </div>
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="hidden md:block"
          >
            <Activity size={64} className="text-blue-200" />
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Issues" value={stats.total} icon={FileText} color="bg-gradient-to-br from-blue-500 to-blue-600" index={0} />
        <StatCard title="Pending" value={stats.pending} icon={Clock} color="bg-gradient-to-br from-yellow-500 to-orange-500" index={1} />
        <StatCard title="In Progress" value={stats.inProgress} icon={RefreshCcw} color="bg-gradient-to-br from-purple-500 to-purple-600" index={2} />
        <StatCard title="Resolved" value={stats.resolved} icon={CheckCircle} color="bg-gradient-to-br from-green-500 to-green-600" index={3} />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payments Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl shadow-lg border p-8 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div 
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <CreditCard className="text-white" size={24} />
            </motion.div>
            <h3 className="font-bold text-gray-800 text-xl">Payments</h3>
          </div>
          <motion.p 
            className="text-5xl font-bold text-gray-800 mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            {stats.payments}
          </motion.p>
          <p className="text-gray-500 font-medium">Successful transactions</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <TrendingUp size={14} />
            <span>All payments completed</span>
          </div>
        </motion.div>

        {/* Activity Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-lg border p-8 lg:col-span-2 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Activity className="text-blue-600" size={24} />
            </motion.div>
            <h3 className="font-bold text-gray-800 text-xl">Activity Overview</h3>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="w-full h-72"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#4f46e5" 
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CitizenHome;