// src/pages/Dashboard/Citizen/SubmitIssue.jsx
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FileText, MapPin, Image, Send, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const SubmitIssue = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, userEmail: user.email };
      const res = await axiosSecure.post("/issues", payload);

      if (res.data.success) {
        Swal.fire("Issue Submitted", "Your issue has been reported", "success");
        reset();
        navigate("/dashboard/my-issues");
      } else {
        Swal.fire("Failed", res.data.message || "", "error");
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || err.message,
        "error"
      );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="text-blue-200" />
            Report an Issue
          </h2>
          <p className="text-blue-100 mt-2">
            Submit details about the problem you are facing and help improve your community
          </p>
        </div>
      </motion.div>

      {/* Form Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg border p-8"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Issue Title *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText size={18} className="text-gray-400" />
              </div>
              <input
                {...register("title", { required: "Title is required" })}
                placeholder="Short, descriptive title of the issue"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              />
              {errors.title && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1 mt-1 text-red-600 text-sm"
                >
                  <AlertCircle size={14} />
                  {errors.title.message}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Describe the issue in detail - what happened, when, and any other relevant information"
              rows={5}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.description && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1 mt-1 text-red-600 text-sm"
              >
                <AlertCircle size={14} />
                {errors.description.message}
              </motion.div>
            )}
          </motion.div>

          {/* Category */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <select
              {...register("category", { required: "Please select a category" })}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.category ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <option value="">Select Category</option>
              <option value="road">🛣️ Road & Infrastructure</option>
              <option value="water">💧 Water & Drainage</option>
              <option value="garbage">🗑️ Waste Management</option>
              <option value="electricity">⚡ Electricity</option>
              <option value="other">📋 Other</option>
            </select>
            {errors.category && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1 mt-1 text-red-600 text-sm"
              >
                <AlertCircle size={14} />
                {errors.category.message}
              </motion.div>
            )}
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-gray-400" />
              </div>
              <input
                {...register("location")}
                placeholder="Specific area, street name, or landmark"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
              />
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL (optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image size={18} className="text-gray-400" />
              </div>
              <input
                {...register("imageURL")}
                placeholder="https://example.com/image.jpg"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Adding an image helps authorities understand the issue better
            </p>
          </motion.div>

          {/* Submit */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="pt-6 flex justify-end"
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Issue
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SubmitIssue;
