import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import StatusBadge from "./components/StatusBadge";
import PriorityBadge from "./components/PriorityBadge";
import FilterBar from "./components/FilterBar";


const STATUS_FLOW = {
  Pending: ["In Progress"],
  "In Progress": ["Working"],
  Working: ["Resolved"],
  Resolved: ["Closed"],
};

const formatStatus = (status) =>
  status
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

const AssignedIssues = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");

  /* ===================== LOAD ISSUES ===================== */
  useEffect(() => {
    if (!user?.email) return;

    const loadIssues = async () => {
      setLoading(true);
      try {
        const q = new URLSearchParams({ email: user.email });
        if (status) q.set("status", status);
        if (priority) q.set("priority", priority);
        if (search) q.set("search", search);

        const res = await axiosSecure.get(
          `/dashboard/staff/issues?${q.toString()}`
        );

        setIssues(res.data || []);
      } catch (err) {
        console.error("Failed to load assigned issues", err);
      } finally {
        setLoading(false);
      }
    };

    loadIssues();
  }, [user?.email, axiosSecure, status, priority, search]);

  /* ===================== CHANGE STATUS ===================== */
  const changeStatus = async (issueId, newStatus) => {
    const previous = [...issues];

    // Optimistic UI update
    setIssues((list) =>
      list.map((issue) =>
        issue._id === issueId ? { ...issue, status: newStatus } : issue
      )
    );

    try {
      const res = await axiosSecure.patch(
        `/dashboard/staff/status/${issueId}`,
        { newStatus } // must be DB format
      );

      const updatedIssue = res.data.issue;

      setIssues((list) =>
        list.map((issue) => (issue._id === issueId ? updatedIssue : issue))
      );
    } catch (err) {
      console.error("Status update failed", err);
      setIssues(previous);
      alert("Status update failed. Please try again.");
    }
  };

  /* ===================== UI ===================== */
  if (loading) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-slate-300">
        Loading issues...
      </div>
    );
  }

  return (
    <div className="space-y-4 text-slate-100">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-blue-700">Assigned Issues</h2>

        <FilterBar
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
          search={search}
          setSearch={setSearch}
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
              <tr>
                <td colSpan={7} className="p-6 text-center text-slate-400">
                  No assigned issues
                </td>
              </tr>
            )}

            {issues.map((issue) => (
              <tr
                key={issue._id}
                className="border-t border-[#0b2238] hover:bg-[#042037]"
              >
                <td className="px-4 py-3">
                  <Link
                    to={`/dashboard/staff-issue/${issue._id}`}
                    className="text-blue-400 hover:underline"
                  >
                    {issue.title}
                  </Link>
                </td>

                <td className="px-4 py-3 text-slate-300">{issue.category}</td>
                <td className="px-4 py-3 text-slate-300">{issue.location}</td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={issue.priority} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={issue.status} />
                </td>
                <td className="px-4 py-3 text-slate-400 text-sm">
                  {new Date(issue.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <StatusChanger
                    current={issue.status}
                    onChange={(ns) => changeStatus(issue._id, ns)}
                  />
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

/* ===================== STATUS CHANGER (DROP-UP) ===================== */
function StatusChanger({ current, onChange }) {
  const [open, setOpen] = useState(false);
  const options = STATUS_FLOW[current] || []; // DB-compatible status

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(v => !v)}
        className="px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white rounded text-sm transition"
      >
        Change
      </button>

      {open && (
        <div className="absolute right-0 bottom-full mb-2 w-44 bg-[#031428] border border-[#123] rounded-lg shadow-xl z-50">
          {options.length === 0 && (
            <div className="px-3 py-2 text-slate-400 text-sm">No actions available</div>
          )}

          {options.map(opt => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt); // Send DB-compatible status
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-[#04263b] transition"
            >
              {opt} {/* Already readable */}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

