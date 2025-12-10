import React from "react";
import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import AdminSidebar from "../pages/Dashboard/AdminSidebar";
import StaffSidebar from "../pages/Dashboard/StaffSidebar";
import CitizenSidebar from "../pages/Dashboard/CitizenSidebar";
import { FaHome } from "react-icons/fa";

const DashboardLayout = () => {
  const { role } = useRole();

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg h-screen p-5 flex flex-col fixed left-0 top-0">
        <Link
          to="/"
          className="flex items-center gap-2 text-blue-600 font-bold text-lg mb-5 hover:text-blue-700"
        >
          <FaHome /> Back to Home
        </Link>

        {role === "admin" && <AdminSidebar />}
        {role === "staff" && <StaffSidebar />}
        {role === "citizen" && <CitizenSidebar />}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
