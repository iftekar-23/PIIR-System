import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const StaffRoute = ({ children }) => {
  const { role, isLoading } = useRole();

  if (isLoading) return <p>Loading...</p>;

  return role === "staff" ? children : <Navigate to="/unauthorized" />;
};

export default StaffRoute;
