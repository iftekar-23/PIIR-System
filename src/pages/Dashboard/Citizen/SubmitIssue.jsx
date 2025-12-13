// src/pages/Dashboard/Citizen/SubmitIssue.jsx
import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FileText, MapPin, Image, Send } from "lucide-react";

const SubmitIssue = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

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
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Report an Issue
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Submit details about the problem you are facing
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Issue Title
            </label>
            <div className="flex items-center gap-2 mt-1">
              <FileText size={18} className="text-gray-400" />
              <input
                {...register("title", { required: true })}
                placeholder="Short title of the issue"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Describe the issue in detail"
              rows={4}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              {...register("category", { required: true })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="road">Road</option>
              <option value="water">Water</option>
              <option value="garbage">Garbage</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Location
            </label>
            <div className="flex items-center gap-2 mt-1">
              <MapPin size={18} className="text-gray-400" />
              <input
                {...register("location")}
                placeholder="Area / Address"
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Image URL (optional)
            </label>
            <div className="flex items-center gap-2 mt-1">
              <Image size={18} className="text-gray-400" />
              <input
                {...register("imageURL")}
                placeholder="https://example.com/image.jpg"
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Send size={16} />
              Submit Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitIssue;
