import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useRole();

  if (isLoading) return <p>Loading...</p>;

  return role === "admin" ? children : <Navigate to="/unauthorized" />;
};

export default AdminRoute;
