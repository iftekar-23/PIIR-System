import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (!user) return;
    axiosSecure.get(`/admin/users`).then(res => {
      const admin = res.data.find(u => u.email === user.email);
      if (admin) setProfile({ name: admin.name, email: admin.email, phone: admin.phone });
    });
  }, [user, axiosSecure]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axiosSecure.patch(`/admin/staff/${profile.email}`, profile); // Update same API
    alert("Profile updated successfully");
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 max-w-md">
      <h2 className="text-xl font-bold mb-4">Admin Profile</h2>
      <form className="space-y-2" onSubmit={handleUpdate}>
        <input
          className="w-full p-2 border rounded"
          value={profile.name}
          onChange={e => setProfile({...profile, name: e.target.value})}
          required
        />
        <input
          className="w-full p-2 border rounded"
          value={profile.email}
          readOnly
        />
        <input
          className="w-full p-2 border rounded"
          value={profile.phone}
          onChange={e => setProfile({...profile, phone: e.target.value})}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Update Profile</button>
      </form>
    </div>
  );
};

export default AdminProfile;
