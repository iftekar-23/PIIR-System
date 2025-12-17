import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Swal from "sweetalert2";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role, loading } = useRole();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isDashboard = location.pathname.startsWith("/dashboard");

  const navItemStyle =
    "block font-medium text-gray-700 hover:text-blue-600 transition";

  const dashboardLink = {
    admin: "/dashboard/admin-home",
    staff: "/dashboard/staff-home",
    citizen: "/dashboard/citizen-home",
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
    });

    if (result.isConfirmed) {
      await logOut();
      Swal.fire("Logged out", "", "success");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-8 h-16">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CityFix
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {!isDashboard && (
            <>
              <NavLink to="/" className={navItemStyle}>Home</NavLink>
              <NavLink to="/issues" className={navItemStyle}>Issues</NavLink>
              <NavLink to="/about" className={navItemStyle}>About</NavLink>
              <NavLink to="/contact" className={navItemStyle}>Contact</NavLink>
            </>
          )}

          {/* PROFILE DROPDOWN */}
          {!user ? (
            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-9 h-9 rounded-full border"
                  />
                ) : (
                  <FaUserCircle className="text-3xl" />
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg p-3 space-y-2">
                  <p className="text-sm font-semibold text-gray-700 truncate">
                    {user.displayName || "User"}
                  </p>

                  {!loading && (
                    <Link
                      to={dashboardLink[role]}
                      className="block text-blue-600 font-medium hover:underline"
                    >
                      Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-center text-red-500 font-medium py-1 hover:bg-red-50 rounded transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 border-t">

          {!isDashboard && (
            <>
              <NavLink to="/" className={navItemStyle}>Home</NavLink>
              <NavLink to="/issues" className={navItemStyle}>Issues</NavLink>
              <NavLink to="/about" className={navItemStyle}>About</NavLink>
              <NavLink to="/contact" className={navItemStyle}>Contact</NavLink>
            </>
          )}

          {/* MOBILE PROFILE */}
          {user ? (
            <div className="pt-3 border-t space-y-2">
              <p className="font-semibold text-gray-700">
                {user.displayName || "User"}
              </p>

              {!loading && (
                <Link
                  to={dashboardLink[role]}
                  className="block text-blue-600 font-medium"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full text-center text-red-500 font-medium py-2 hover:bg-red-50 rounded"
              >
                Logout
              </button>

            </div>
          ) : (
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
