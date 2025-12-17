import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import AdminSidebar from "../pages/Dashboard/AdminSidebar";
import StaffSidebar from "../pages/Dashboard/StaffSidebar";
import CitizenSidebar from "../pages/Dashboard/CitizenSidebar";
import { FaHome, FaBars } from "react-icons/fa";

const DashboardLayout = () => {
  const { role, loading } = useRole();
  const [open, setOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 bg-white shadow-lg w-64 p-5 z-50 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition md:hidden`}
      >
        <button onClick={() => setOpen(false)} className="mb-4">
          ✕
        </button>

        <Link to="/" className="flex items-center gap-2 text-blue-600 mb-5">
          <FaHome /> Home
        </Link>

        {role === "admin" && <AdminSidebar />}
        {role === "staff" && <StaffSidebar />}
        {role === "citizen" && <CitizenSidebar />}
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block w-64 bg-white shadow-lg p-5">
        <Link to="/" className="flex items-center gap-2 text-blue-600 mb-5">
          <FaHome /> Home
        </Link>

        {role === "admin" && <AdminSidebar />}
        {role === "staff" && <StaffSidebar />}
        {role === "citizen" && <CitizenSidebar />}
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">
        <button
          onClick={() => setOpen(true)}
          className="md:hidden mb-4 text-xl"
        >
          <FaBars />
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
