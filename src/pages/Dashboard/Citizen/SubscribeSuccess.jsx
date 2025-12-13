import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SubscribeSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) return;

    const confirmSubscription = async () => {
      try {
        await axiosSecure.get(
          `/payments/subscribe-success?session_id=${sessionId}`
        );

        Swal.fire({
          icon: "success",
          title: "Subscription Successful!",
          text: "You are now a Premium user 🎉",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/dashboard/citizen-profile");
        }, 2000);
      } catch (err) {
        Swal.fire(
          "Error",
          err.response?.data?.message || "Subscription failed",
          "error"
        );
      }
    };

    confirmSubscription();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium">Confirming your subscription...</p>
    </div>
  );
};

export default SubscribeSuccess;
