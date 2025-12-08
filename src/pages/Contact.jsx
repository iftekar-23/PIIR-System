import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
  return (
    <section className="py-20 px-6">
      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
          Contact Us
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
          Have questions, suggestions, or need support?  
          The CityFix team is always here to help.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch">
        
        {/* CONTACT INFO – FULL HEIGHT */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-between h-full">
          <div className="space-y-6">

            <div className="p-6 bg-blue-50 rounded-2xl flex items-start gap-4">
              <FiMail className="text-3xl text-blue-600" />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                <p className="text-gray-600">support@cityfix.com</p>
              </div>
            </div>

            <div className="p-6 bg-blue-50 rounded-2xl flex items-start gap-4">
              <FiPhone className="text-3xl text-blue-600" />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Phone</h4>
                <p className="text-gray-600">+1 800 123 4567</p>
              </div>
            </div>

            <div className="p-6 bg-blue-50 rounded-2xl flex items-start gap-4">
              <FiMapPin className="text-3xl text-blue-600" />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Address</h4>
                <p className="text-gray-600">
                  CityFix HQ, Downtown Innovation Center
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* FORM – FULL HEIGHT */}
        <div className="bg-white shadow-lg p-10 rounded-2xl flex flex-col justify-between h-full">
          <div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-6">
              Send Us a Message
            </h3>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>

              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
