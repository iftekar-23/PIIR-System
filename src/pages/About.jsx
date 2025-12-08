import { FiEye, FiZap, FiUsers } from "react-icons/fi";

const About = () => {
  return (
    <section className="py-20">
      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
          About CityFix
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto mt-4 text-lg leading-relaxed">
          CityFix is a next-generation public infrastructure reporting system
          built to make cities smarter, cleaner, and more efficient. Our goal is
          to connect citizens and municipal authorities in a transparent and
          data-driven way.
        </p>
      </div>

      {/* FEATURES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 max-w-6xl mx-auto">
        
        {/* CARD 1 */}
        <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all text-center">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 flex items-center justify-center rounded-2xl mx-auto mb-6 text-4xl">
            <FiEye />
          </div>
          <h3 className="text-2xl font-semibold text-blue-700">Transparency</h3>
          <p className="text-gray-600 mt-3 leading-relaxed">
            Track every reported issue from submission to resolution. Citizens stay
            informed at every step.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all text-center">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 flex items-center justify-center rounded-2xl mx-auto mb-6 text-4xl">
            <FiZap />
          </div>
          <h3 className="text-2xl font-semibold text-blue-700">Efficiency</h3>
          <p className="text-gray-600 mt-3 leading-relaxed">
            CityFix optimizes administrative workflows, helping municipal staff
            respond and resolve issues faster.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all text-center">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 flex items-center justify-center rounded-2xl mx-auto mb-6 text-4xl">
            <FiUsers />
          </div>
          <h3 className="text-2xl font-semibold text-blue-700">Community Impact</h3>
          <p className="text-gray-600 mt-3 leading-relaxed">
            Empowering citizens to actively participate in improving their
            neighborhoods and urban environment.
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;
