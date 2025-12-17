import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBan, FaCheckCircle } from "react-icons/fa";

const AdminUsers = () => {
  const axiosSecure = useAxiosSecure();

  const [citizens, setCitizens] = useState([]);
  const [staff, setStaff] = useState([]);
  const [activeTab, setActiveTab] = useState("citizens");
  const [loading, setLoading] = useState(true);

  // Fetch citizens & staff separately (matches backend)
  const fetchData = async () => {
    try {
      setLoading(true);
      const [citizenRes, staffRes] = await Promise.all([
        axiosSecure.get("/admin/users"),
        axiosSecure.get("/admin/staff"),
      ]);

      setCitizens(citizenRes.data || []);
      setStaff(staffRes.data || []);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleBlock = async (email, isBlocked) => {
    const action = isBlocked ? "unblock" : "block";
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;

    const endpoint = isBlocked
      ? `/admin/users/${email}/unblock`
      : `/admin/users/${email}/block`;

    await axiosSecure.patch(endpoint);
    fetchData();
  };

  const Table = ({ data = [] }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-center">Name</th>
            <th className="px-4 py-3 text-center">Email</th>
            <th className="px-4 py-3 text-center">Role</th>
            <th className="px-4 py-3 text-center">Premium</th>
            <th className="px-4 py-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr key={u._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{u.name || "N/A"}</td>
              <td className="px-4 py-3">{u.email}</td>
              <td className="px-4 py-3 capitalize">{u.role}</td>
              <td className="px-4 py-3">
                {u.isPremium ? (
                  <span className="text-green-600 font-semibold">Yes</span>
                ) : (
                  <span className="text-gray-500">No</span>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => toggleBlock(u.email, u.isBlocked)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    u.isBlocked
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  {u.isBlocked ? <FaCheckCircle /> : <FaBan />}
                  {u.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <p className="text-center text-gray-500 py-6">No data found</p>
      )}
    </div>
  );

  if (loading) {
    return <div className="p-8 text-center">Loading users...</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">User & Staff Management</h2>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("citizens")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            activeTab === "citizens"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Citizens
        </button>
        <button
          onClick={() => setActiveTab("staff")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            activeTab === "staff"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Staff
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        {activeTab === "citizens" && <Table data={citizens} />}
        {activeTab === "staff" && <Table data={staff} />}
      </div>
    </div>
  );
};

export default AdminUsers;