const StatusBadge = ({ status }) => {
  const s = (status || "").toLowerCase();
  const map = {
    pending: "bg-yellow-200 text-yellow-900",
    "in-progress": "bg-blue-200 text-blue-900",
    working: "bg-indigo-200 text-indigo-900",
    resolved: "bg-green-200 text-green-900",
    closed: "bg-slate-200 text-slate-900",
  };
  return <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${map[s] || "bg-gray-200 text-gray-800"}`}>{status || "N/A"}</span>;
};
export default StatusBadge;
