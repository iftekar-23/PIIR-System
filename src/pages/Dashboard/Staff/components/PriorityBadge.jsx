const PriorityBadge = ({ priority }) => {
  const p = (priority || "").toLowerCase();
  return p === "high" ? (
    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-red-600 text-white">HIGH</span>
  ) : (
    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-900">normal</span>
  );
};
export default PriorityBadge;
