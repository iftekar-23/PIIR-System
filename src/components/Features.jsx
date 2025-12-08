const Features = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="text-center p-6 bg-white shadow rounded-xl">
          <h3 className="text-xl font-semibold">Fast Reporting</h3>
          <p className="text-gray-600 mt-2">Report issues within seconds.</p>
        </div>

        <div className="text-center p-6 bg-white shadow rounded-xl">
          <h3 className="text-xl font-semibold">Real-time Tracking</h3>
          <p className="text-gray-600 mt-2">Track issue status anytime.</p>
        </div>

        <div className="text-center p-6 bg-white shadow rounded-xl">
          <h3 className="text-xl font-semibold">Premium Support</h3>
          <p className="text-gray-600 mt-2">Priority service for premium users.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
