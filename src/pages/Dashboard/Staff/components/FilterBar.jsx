import React from "react";

const FilterBar = ({ status, setStatus, priority, setPriority, search, setSearch }) => {
  return (
    <div className="flex items-center gap-2">
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-[#01121c] border border-[#123] text-slate-200 rounded p-2 text-sm">
        <option value="">All status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In-progress</option>
        <option value="working">Working</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="bg-[#01121c] border border-[#123] text-slate-200 rounded p-2 text-sm">
        <option value="">All priority</option>
        <option value="High">High</option>
        <option value="normal">normal</option>
      </select>

      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title..." className="bg-[#01121c] border border-[#123] rounded p-2 text-sm text-slate-200" />
      <button onClick={() => { setStatus(""); setPriority(""); setSearch(""); }} className="px-3 py-1 bg-[#0b2336] text-slate-300 rounded text-sm">Reset</button>
    </div>
  );
};

export default FilterBar;
