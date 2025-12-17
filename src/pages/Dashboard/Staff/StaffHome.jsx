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
                setStats(res.data || {});
            } catch (err) {
                console.error("Failed to load staff stats", err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [user?.email, axiosSecure]);

    if (loading) {
        return (
            <div className="min-h-[300px] flex items-center justify-center text-gray-500">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="space-y-10 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-3xl font-bold text-blue-900">Staff Dashboard</h1>
                    <p className="text-blue-900">Overview of your assigned and completed work</p>
                </div>
                <div className="text-gray-700 text-sm">
                    Logged in as <span className="font-medium ">{user?.email}</span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Assigned Issues" value={stats.assigned} accent="blue" />
                <StatCard title="Resolved Issues" value={stats.resolved} accent="green" />
                <StatCard title="Closed Issues" value={stats.closed} accent="purple" />
            </div>


            {/* Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sparkline */}
                <div className="lg:col-span-2 p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Today's Tasks</h3>
                            <p className="text-gray-500 text-sm">Activity trend for today</p>
                        </div>
                        <div className="text-gray-700 text-sm">{stats.todaysTasks} tasks</div>
                    </div>
                    <div className="h-48">
                        <Sparkline
                            data={(stats.recentActivity || []).map((r) => r.count || 0)}
                            color="#3b82f6" // blue accent line
                        />
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="p-4 border border-gray-200 rounded-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                        {(stats.recentActivity || []).slice(0, 6).map((a, i) => (
                            <li key={i} className="flex justify-between border-b border-gray-200 pb-1 last:border-0">
                                <span>{a.label || `Activity ${i + 1}`}</span>
                                <span className="text-gray-500">{a.count}</span>
                            </li>
                        ))}
                        {(!stats.recentActivity || stats.recentActivity.length === 0) && (
                            <li className="text-gray-400 text-center py-6">No recent activity</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StaffHome;
