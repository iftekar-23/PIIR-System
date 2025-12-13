import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";


const CitizenRoute = ({ children }) => {
  const { user } = useAuth();
  const { role, loading } = useRole();

  if (!user) return <Navigate to="/login" replace />;
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (role !== "citizen") return <Navigate to="/" replace />;

  return children;
};

export default CitizenRoute;
