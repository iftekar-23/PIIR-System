const Sparkline = ({ data = [] }) => {
  if (!data.length) return <div className="text-slate-500">No data</div>;
  const w = 240, h = 60;
  const max = Math.max(...data) || 1;
  const points = data.map((v,i) => `${(i/(data.length-1))*w},${h - (v/max)*h}`).join(" ");
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polyline fill="none" stroke="#00f6ff" strokeWidth="2" points={points} opacity="0.9" />
      <polyline fill="none" stroke="#7c3aed" strokeWidth="1" points={points} opacity="0.6" />
    </svg>
  );
};
export default Sparkline;
