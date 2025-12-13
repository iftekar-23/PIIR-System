import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import StatCard from "./components/StatCard";
import Sparkline from "./components/Sparkline";

const StaffHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    assigned: 0,
    resolved: 0,
    closed: 0,
    todaysTasks: 0,
    recentActivity: [],
  });

  useEffect(() => {
    if (!user?.email) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/dashboard/staff/stats?email=${user.email}`);
        // expected { assigned, resolved, closed, todaysTasks, recentActivity: [{count,...}] }
        setStats(res.data || {});
      } catch (err) {
        console.error("Failed to load staff stats", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.email, axiosSecure]);

  if (loading) return <div className="min-h-[300px] flex items-center justify-center text-slate-300">Loading dashboard...</div>;

  return (
    <div className="space-y-6 text-slate-100">
      <h1 className="text-2xl font-bold text-neon-1">Staff Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Assigned Issues" value={stats.assigned} accent="violet" />
        <StatCard title="Resolved" value={stats.resolved} accent="green" />
        <StatCard title="Closed" value={stats.closed} accent="cyan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2 bg-[#071025] border border-[#112233] rounded-lg p-4 shadow-neon">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-neon-2">Today's Tasks</h3>
            <div className="text-sm text-slate-400">{stats.todaysTasks} tasks</div>
          </div>
          <div className="h-48 flex items-center justify-center">
            <Sparkline data={(stats.recentActivity || []).map(r => r.count || 0)} />
          </div>
        </div>

        <div className="bg-[#071025] border border-[#112233] rounded-lg p-4 shadow-neon">
          <h3 className="text-lg font-semibold text-neon-2 mb-2">Recent Activity</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            {(stats.recentActivity || []).slice(0, 6).map((a, i) => (
              <li key={i} className="flex items-center justify-between">
                <span>{a.label || `Activity ${i+1}`}</span>
                <span className="text-slate-400">{a.count}</span>
              </li>
            ))}
            {(!stats.recentActivity || stats.recentActivity.length === 0) && <li className="text-slate-500">No recent activity</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StaffHome;
