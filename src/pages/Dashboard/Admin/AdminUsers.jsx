import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axiosSecure.get("/admin/users");
    setUsers(res.data);
  };

  const toggleBlock = async (email, isBlocked) => {
    if (!window.confirm(`Are you sure to ${isBlocked ? "unblock" : "block"} this user?`)) return;
    await axiosSecure.patch(`/admin/users/${email}/${isBlocked ? "unblock" : "block"}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.phone}</td>
              <td className="p-2 border">
                <button
                  onClick={() => toggleBlock(user.email, user.isBlocked)}
                  className={`px-3 py-1 rounded ${user.isBlocked ? "bg-green-500" : "bg-red-500"} text-white`}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
