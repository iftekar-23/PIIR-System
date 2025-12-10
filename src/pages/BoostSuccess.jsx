// src/pages/BoostSuccess.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";


const BoostSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      setMessage("Missing session id");
      return;
    }

    // call backend to process session (backend updates issue priority + timeline)
    axiosSecure
      .get(`/boost-success?session_id=${sessionId}`)
      .then((res) => {
        if (res.data?.success) {
          setMessage("Payment successful. Updating issue...");
          // After short wait redirect to issue page, session returns metadata.issueId
          const issueId = res.data?.modifiedIssueId || res.data?.issueId || null;
          // If backend does not return issueId, fallback to redirect to issues list
          setTimeout(() => {
            navigate(issueId ? `/issues/${issueId}` : "/issues");
          }, 1600);
        } else {
          setMessage("Payment processed but no update found. Try refreshing the issue page.");
          setTimeout(() => navigate("/issues"), 2000);
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to verify payment. Contact support.");
      });
  }, [searchParams, axiosSecure, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Payment Status</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default BoostSuccess;
