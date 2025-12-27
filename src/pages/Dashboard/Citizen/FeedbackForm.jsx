import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const FeedbackForm = ({ issue }) => {
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!issue?._id) {
      alert("Issue ID missing");
      return;
    }

    if (rating === 0) {
      alert("Please give rating");
      return;
    }

    try {
      setLoading(true);
      await axiosSecure.post(`/issues/${issue._id}/feedback`, {
        rating,
        comment,
      });
      alert("Feedback submitted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h3 className="font-semibold text-lg">Rate the Service</h3>

      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n)}
            className={`text-3xl ${
              n <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        className="w-full border p-3 rounded"
        placeholder="Write your feedback..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        disabled={loading}
        onClick={submit}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </div>
  );
};

export default FeedbackForm;
