const ImpactSection = () => {
  const stats = [
    { label: "Total Issues Reported", value: "12,450+" },
    { label: "Issues Resolved", value: "10,320+" },
    { label: "Active Staff Members", value: "240+" },
    { label: "Avg. Response Time", value: "3.8 hrs" },
  ];

  return (
    <section className="py-20 mt-10 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-sm">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-700">Our Impact</h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          See how the system is improving city services and building a better community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center"
          >
            <h3 className="text-3xl font-bold text-blue-600">{s.value}</h3>
            <p className="text-gray-700 mt-2 font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;
