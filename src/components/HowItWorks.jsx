const HowItWorks = () => {
  return (
    <section className="py-20 bg-blue-50 rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div>
          <h3 className="font-semibold text-xl text-blue-600">1. Report Issue</h3>
          <p className="text-gray-600 mt-2">Upload photo, add location & details.</p>
        </div>

        <div>
          <h3 className="font-semibold text-xl text-blue-600">2. Admin Assigns</h3>
          <p className="text-gray-600 mt-2">Staff verifies & updates progress.</p>
        </div>

        <div>
          <h3 className="font-semibold text-xl text-blue-600">3. Resolved</h3>
          <p className="text-gray-600 mt-2">Citizen gets real-time updates.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
