// src/pages/Dashboard/Admin/AdminStaff.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const AdminStaff = () => {
  const axiosSecure = useAxiosSecure();
  const [staffList, setStaffList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", photoURL: "", password: "" });
  const [editEmail, setEditEmail] = useState(null);

  const fetchStaff = async () => {
    const res = await axiosSecure.get("/admin/staff");
    setStaffList(res.data);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editEmail) {
      await axiosSecure.patch(`/admin/staff/${editEmail}`, formData);
    } else {
      await axiosSecure.post("/admin/staff", formData);
    }
    setModalOpen(false);
    setFormData({ name: "", email: "", phone: "", photoURL: "", password: "" });
    setEditEmail(null);
    fetchStaff();
  };

  const handleEdit = (staff) => {
    setFormData({ name: staff.name, email: staff.email, phone: staff.phone, photoURL: staff.photoURL, password: "" });
    setEditEmail(staff.email);
    setModalOpen(true);
  };

  const handleDelete = async (email) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      await axiosSecure.delete(`/admin/staff/${email}`);
      fetchStaff();
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Staff</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add Staff
        </button>
      </div>

      {/* STAFF TABLE */}
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
          {staffList.map(staff => (
            <tr key={staff._id} className="hover:bg-gray-50">
              <td className="p-2 border">{staff.name}</td>
              <td className="p-2 border">{staff.email}</td>
              <td className="p-2 border">{staff.phone}</td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => handleEdit(staff)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(staff.email)}
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL FORM */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 space-y-4">
            <h3 className="text-lg font-bold">{editEmail ? "Update Staff" : "Add Staff"}</h3>
            <form className="space-y-2" onSubmit={handleSubmit}>
              <input
                className="w-full p-2 border rounded"
                placeholder="Name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required
                disabled={!!editEmail}
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Phone"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                required
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Photo URL"
                value={formData.photoURL}
                onChange={e => setFormData({...formData, photoURL: e.target.value})}
              />
              {!editEmail && (
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  required
                />
              )}
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => {setModalOpen(false); setEditEmail(null)}} className="px-3 py-1 bg-gray-400 rounded">Cancel</button>
                <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">{editEmail ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStaff;
