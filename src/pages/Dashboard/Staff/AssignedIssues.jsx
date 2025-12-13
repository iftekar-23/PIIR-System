import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import StatusBadge from "./components/StatusBadge";
import PriorityBadge from "./components/PriorityBadge";
import FilterBar from "./components/FilterBar";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignedIssues = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    const load = async () => {
      try {
        const q = new URLSearchParams();
        q.set("email", user.email);
        if (status) q.set("status", status);
        if (priority) q.set("priority", priority);
        if (search) q.set("search", search);

        const res = await axiosSecure.get(`/dashboard/staff/issues?${q.toString()}`);
        // sort: High priority first, then newest
        const list = (res.data || []).sort((a,b) => {
          if ((b.priority === "High") !== (a.priority === "High")) return b.priority === "High" ? 1 : -1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setIssues(list);
      } catch (err) {
        console.error("Failed to load assigned issues", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.email, axiosSecure, status, priority, search]);

  const changeStatus = async (issueId, newStatus) => {
    const prev = [...issues];
    setIssues(list => list.map(i => i._id === issueId ? { ...i, status: newStatus } : i));
    try {
      const res = await axiosSecure.patch(`/dashboard/staff/status/${issueId}`, { newStatus });
      // server returns updated issue in res.data.issue or res.data
      const updated = res.data.issue || res.data;
      setIssues(list => list.map(i => i._id === issueId ? updated : i));
    } catch (err) {
      alert("Failed to update status — reverting.");
      setIssues(prev);
      console.error(err);
    }
  };

  if (loading) return <div className="min-h-[200px] flex items-center justify-center text-slate-300">Loading issues...</div>;

  return (
    <div className="space-y-4 text-slate-100">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neon-1">Assigned Issues</h2>
        <FilterBar
          status={status} setStatus={setStatus}
          priority={priority} setPriority={setPriority}
          search={search} setSearch={setSearch}
        />
      </div>

      <div className="bg-[#041021] border border-[#112233] rounded-lg overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-[#071a36]">
            <tr>
              <th className="px-4 py-3 text-sm text-slate-300">Title</th>
              <th className="px-4 py-3 text-sm text-slate-300">Category</th>
              <th className="px-4 py-3 text-sm text-slate-300">Location</th>
              <th className="px-4 py-3 text-sm text-slate-300">Priority</th>
              <th className="px-4 py-3 text-sm text-slate-300">Status</th>
              <th className="px-4 py-3 text-sm text-slate-300">Created</th>
              <th className="px-4 py-3 text-sm text-slate-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {issues.length === 0 && (
              <tr><td colSpan={7} className="p-6 text-center text-slate-400">No assigned issues</td></tr>
            )}
            {issues.map(issue => (
              <tr key={issue._id} className="border-t border-[#0b2238] hover:bg-[#042037]">
                <td className="px-4 py-3">
                  <Link to={`/dashboard/staff-issue/${issue._id}`} className="text-neon-2 font-medium">
                    {issue.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-300">{issue.category}</td>
                <td className="px-4 py-3 text-slate-300">{issue.location}</td>
                <td className="px-4 py-3"><PriorityBadge priority={issue.priority} /></td>
                <td className="px-4 py-3"><StatusBadge status={issue.status} /></td>
                <td className="px-4 py-3 text-slate-400 text-sm">{new Date(issue.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 items-center">
                    <StatusChanger current={issue.status} onChange={(ns) => changeStatus(issue._id, ns)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedIssues;

/* Inline StatusChanger component - controlled allowed transitions */
function StatusChanger({ current, onChange }) {
  const [open, setOpen] = useState(false);
  const transitions = {
    pending: ["in-progress"],
    "in-progress": ["working"],
    working: ["resolved"],
    resolved: ["closed"]
  };
  const options = transitions[current] || [];

  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setOpen(v => !v)} className="px-3 py-1 bg-[#7c3aed] text-white rounded text-sm">Change</button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-[#031428] border border-[#123] rounded shadow p-2 z-20">
          {options.length === 0 && <div className="text-slate-400 p-2">No actions</div>}
          {options.map(opt => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false); }} className="w-full text-left px-2 py-2 hover:bg-[#04263b] rounded text-sm text-slate-200">
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
