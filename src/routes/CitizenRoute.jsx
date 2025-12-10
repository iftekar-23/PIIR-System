import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const CitizenRoute = ({ children }) => {
  const { role, isLoading } = useRole();

  if (isLoading) return <p>Loading...</p>;

  return role === "citizen" ? children : <Navigate to="/unauthorized" />;
};

export default CitizenRoute;
