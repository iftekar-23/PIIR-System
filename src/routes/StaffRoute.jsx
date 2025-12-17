// import { Navigate } from "react-router";
// import useRole from "../hooks/useRole";
// import useAuth from "../hooks/useAuth";
// import LoadingSpinner from "../components/LoadingSpinner";

// const StaffRoute = ({ children }) => {
//   const { user, loading: authLoading } = useAuth();
//   const { role, loading: roleLoading } = useRole();

//   if (authLoading || roleLoading) {
//     return <LoadingSpinner />;
//   }

//   if (!user) return <Navigate to="/login" replace />;
//   if (role !== "staff") return <Navigate to="/" replace />;

//   return children;
// };

// export default StaffRoute;
