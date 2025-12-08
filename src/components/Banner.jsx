const Banner = () => {
  return (
    <section className="h-[70vh] bg-blue-600 text-white rounded-xl flex items-center px-10">
      <div className="max-w-xl space-y-4">
        <h1 className="text-4xl font-bold">
          Report Public Issues Easily & Improve Your City
        </h1>
        <p className="text-lg text-blue-100">
          Help your city become better. Report problems instantly with photos and location.
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold">
            Report an Issue
          </button>
          <button className="border border-white px-6 py-3 rounded-md">
            View Issues
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
