import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const StaffProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, setUserLocal } = useAuth();
  const [profile, setProfile] = useState({ name: "", email: "", photoURL: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setProfile(res.data.user || res.data);
      } catch (err) {
        console.error("Load profile err", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.email, axiosSecure]);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axiosSecure.patch(`/users/${user.email}`, {
        name: profile.name,
        photoURL: profile.photoURL
      });
      alert("Profile updated");
      if (setUserLocal) setUserLocal(res.data.user);
    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-[200px] flex items-center justify-center text-slate-300">Loading profile...</div>;

  return (
    <div className="max-w-2xl bg-[#041021] border border-[#112233] rounded-lg p-6 text-slate-100">
      <h2 className="text-xl font-semibold text-neon-1 mb-4">Profile</h2>
      <form onSubmit={save} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300">Name</label>
          <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full mt-1 p-2 rounded bg-[#01121c] border border-[#123]" />
        </div>

        <div>
          <label className="block text-sm text-slate-300">Email</label>
          <input value={profile.email} disabled className="w-full mt-1 p-2 rounded bg-[#01121c] border border-[#123] text-slate-400" />
        </div>

        <div>
          <label className="block text-sm text-slate-300">Photo URL</label>
          <input value={profile.photoURL} onChange={e => setProfile({...profile, photoURL: e.target.value})} className="w-full mt-1 p-2 rounded bg-[#01121c] border border-[#123]" />
          <p className="text-xs text-slate-400 mt-1">Paste an image URL or implement file upload endpoint and set photoURL to returned URL.</p>
        </div>

        <div>
          <button disabled={saving} className="px-4 py-2 bg-[#7c3aed] text-white rounded">
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffProfile;
