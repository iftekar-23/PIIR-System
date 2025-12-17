import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const StaffProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, setUserLocal } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    photoURL: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const loadProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setProfile(res.data.user || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user?.email, axiosSecure]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await axiosSecure.patch(`/users/${user.email}`, {
        name: profile.name,
        photoURL: profile.photoURL,
      });

      if (setUserLocal) setUserLocal(res.data.user);
      Swal.fire("Updated!", "Profile updated successfully", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-6 p-6 border-b">
          <img
            src={profile.photoURL || "https://i.ibb.co/2FsfXqM/avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {profile.name || "Staff User"}
            </h2>
            <p className="text-gray-500">{profile.email}</p>
            <span className="inline-block mt-1 px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
              {profile.role || "Staff"}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={profile.email}
              disabled
              className="mt-1 w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              value={profile.photoURL}
              onChange={(e) =>
                setProfile({ ...profile, photoURL: e.target.value })
              }
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="https://example.com/photo.jpg"
            />
            <p className="text-xs text-gray-400 mt-1">
              You can paste an image URL or connect a file upload later.
            </p>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              disabled={saving}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffProfile;
