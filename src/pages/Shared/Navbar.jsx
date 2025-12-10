import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logOut } = useAuth();
  const { role } = useRole()

  const navItemStyle =
    "hover:text-blue-600 transition font-medium text-gray-700";

  // LOGOUT HANDLER WITH SWEETALERT2
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from CityFix!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logOut();

        Swal.fire({
          title: "Logged Out!",
          text: "You have successfully logged out.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <nav className="w-full bg-white border-b border-slate-200 py-4 shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-8">

        {/* LOGO */}
        <Link to="/" className="text-3xl font-bold text-blue-600 tracking-wide">
          CityFix
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navItemStyle}>Home</NavLink>
          <NavLink to="/issues" className={navItemStyle}>All Issues</NavLink>
          <NavLink to="/about" className={navItemStyle}>About Us</NavLink>
          <NavLink to="/contact" className={navItemStyle}>Contact</NavLink>
        </div>

        {/* PROFILE / LOGIN (DESKTOP) */}
        <div className="hidden md:block relative">
          {!user ? (
            <Link
              to="/login"
              className="text-blue-600 font-semibold border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Login
            </Link>
          ) : (
            <>
              <img
                src={user.photoURL}
                alt="profile"
                className="h-10 w-10 rounded-full cursor-pointer border"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg border w-48 rounded-lg p-3">
                  <p className="font-semibold text-gray-700">
                    {user.displayName || "User"}
                  </p>

                  {open && (
  <div className="absolute right-0 mt-2 bg-white shadow-lg border w-48 rounded-lg p-3">
    <p className="font-semibold text-gray-700">
      {user.displayName || "User"}
    </p>

    {role === "admin" && (
      <Link to="/dashboard/admin-home" className="block mt-2 text-blue-600 hover:underline">
        Admin Dashboard
      </Link>
    )}

    {role === "staff" && (
      <Link to="/dashboard/staff-home" className="block mt-2 text-blue-600 hover:underline">
        Staff Dashboard
      </Link>
    )}

    {role === "citizen" && (
      <Link to="/dashboard/citizen-home" className="block mt-2 text-blue-600 hover:underline">
        My Dashboard
      </Link>
    )}

    <button className="text-red-500 mt-3 font-medium" onClick={handleLogout}>
      Logout
    </button>
  </div>
)}


                  <button
                    className="text-red-500 mt-3 font-medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-gray-700"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-3">
          <NavLink to="/" className={navItemStyle}>Home</NavLink>
          <NavLink to="/issues" className={navItemStyle}>All Issues</NavLink>
          <NavLink to="/about" className={navItemStyle}>About Us</NavLink>
          <NavLink to="/contact" className={navItemStyle}>Contact</NavLink>

          {/* MOBILE PROFILE */}
          {!user ? (
            <Link
              to="/login"
              className="block text-blue-600 border border-blue-600 px-4 py-2 rounded-lg w-max"
            >
              Login
            </Link>
          ) : (
            <div className="pt-3 border-t">
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL}
                  className="h-10 w-10 rounded-full border"
                  alt="profile"
                />
                <p className="font-semibold">{user.displayName}</p>
              </div>

             {open && (
  <div className="absolute right-0 mt-2 bg-white shadow-lg border w-48 rounded-lg p-3">
    <p className="font-semibold text-gray-700">
      {user.displayName || "User"}
    </p>

    {role === "admin" && (
      <Link to="/dashboard/admin-home" className="block mt-2 text-blue-600 hover:underline">
        Admin Dashboard
      </Link>
    )}

    {role === "staff" && (
      <Link to="/dashboard/staff-home" className="block mt-2 text-blue-600 hover:underline">
        Staff Dashboard
      </Link>
    )}

    {role === "citizen" && (
      <Link to="/dashboard/citizen-home" className="block mt-2 text-blue-600 hover:underline">
        My Dashboard
      </Link>
    )}

    <button className="text-red-500 mt-3 font-medium" onClick={handleLogout}>
      Logout
    </button>
  </div>
)}


              <button
                className="text-red-500 mt-2 font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
