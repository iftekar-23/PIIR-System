import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // 🔹 Load admin profile directly from DB using email
  useEffect(() => {
    if (!user?.email) return;

    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, axiosSecure]);

  // 🔹 Update profile in DB
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosSecure.patch(`/admin/staff/${profile.email}`, {
        name: profile.name,
        phone: profile.phone,
        photoURL: profile.photoURL,
      });
      setEditing(false);
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
      {/* Header */}
      <div className="flex items-center gap-4 border-b pb-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
          {profile?.name?.charAt(0) || "A"}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-500">Administrator</p>
          <p className="text-sm text-gray-400">{profile.email}</p>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            className="w-full border rounded-lg p-2"
            value={profile.name || ""}
            disabled={!editing}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Phone</label>
          <input
            className="w-full border rounded-lg p-2"
            value={profile.phone || ""}
            disabled={!editing}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Photo URL</label>
          <input
            className="w-full border rounded-lg p-2"
            value={profile.photoURL || ""}
            disabled={!editing}
            onChange={(e) => setProfile({ ...profile, photoURL: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            className="w-full border rounded-lg p-2 bg-gray-100"
            value={profile.email}
            readOnly
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Role</label>
          <input
            className="w-full border rounded-lg p-2 bg-gray-100 capitalize"
            value={profile.role}
            readOnly
          />
        </div>

        {/* Actions */}
        <div className="md:col-span-2 flex justify-end gap-3 mt-4">
          {!editing ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-4 py-2 rounded-lg bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-green-600 text-white"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
