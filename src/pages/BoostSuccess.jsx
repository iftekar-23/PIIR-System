import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";


const BoostSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const sessionId = new URLSearchParams(location.search).get("session_id");
        if (!sessionId) return;

        axiosSecure
            .get(`/payments/boost-success?session_id=${sessionId}`)
            .then(res => {
                if (res.data.success) {
                    navigate(`/issue/${res.data.issueId}`);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, [location, axiosSecure, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h2 className="text-xl font-semibold">
                Processing your payment...
            </h2>
        </div>
    );
};

export default BoostSuccess;
