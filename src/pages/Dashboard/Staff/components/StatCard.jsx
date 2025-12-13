const StatCard = ({ title, value, accent = "violet" }) => {
  const colors = {
    violet: "text-[#d7bfff] bg-gradient-to-br from-[#1b0736]/30 to-[#2e0f4d]/10",
    green: "text-[#9ef2c1] bg-gradient-to-br from-[#04221a]/20 to-[#063924]/10",
    cyan: "text-[#9be7ff] bg-gradient-to-br from-[#021b24]/20 to-[#023140]/10"
  };
  return (
    <div className={`rounded-lg p-4 ${colors[accent] || colors.violet} border border-[#122134] shadow-neon`}>
      <p className="text-sm text-slate-300">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};
export default StatCard;
