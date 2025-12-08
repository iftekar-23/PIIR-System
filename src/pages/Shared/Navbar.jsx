import React, { useState } from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu

  const user = null; // Replace with auth data

  const navItemStyle =
    "hover:text-blue-600 transition font-medium text-gray-700";

  return (
    <nav className="w-full bg-white border-b border-slate-200 py-4 shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-8">
        {/* LOGO */}
        <Link to="/" className="text-3xl font-bold text-blue-600 tracking-wide">
          CityFix
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navItemStyle}>
            Home
          </NavLink>

          <NavLink to="/issues" className={navItemStyle}>
            All Issues
          </NavLink>

          <NavLink to="/about" className={navItemStyle}>
            About Us
          </NavLink>

          <NavLink to="/contact" className={navItemStyle}>
            Contact
          </NavLink>
        </div>

        {/* PROFILE / LOGIN */}
        <div className="hidden md:block">
          {!user ? (
            <Link
              to="/login"
              className="text-blue-600 font-semibold border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL}
                className="h-10 w-10 rounded-full cursor-pointer border"
                onClick={() => setOpen(!open)}
                alt="profile"
              />
              {open && (
                <div className="absolute right-0 bg-white shadow-md p-4 w-40 rounded-lg border">
                  <p className="font-medium">{user.displayName}</p>
                  <Link
                    to="/dashboard"
                    className="block mt-2 text-blue-600 hover:underline"
                  >
                    Dashboard
                  </Link>
                  <button className="text-red-500 mt-2">Logout</button>
                </div>
              )}
            </div>
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
          <NavLink to="/" className={navItemStyle}>
            Home
          </NavLink>

          <NavLink to="/issues" className={navItemStyle}>
            All Issues
          </NavLink>

          <NavLink to="/about" className={navItemStyle}>
            About Us
          </NavLink>

          <NavLink to="/contact" className={navItemStyle}>
            Contact
          </NavLink>

          {!user ? (
            <Link
              to="/login"
              className="block text-blue-600 border border-blue-600 px-4 py-2 rounded-lg w-max"
            >
              Login
            </Link>
          ) : (
            <div>
              <p className="font-medium">{user.displayName}</p>
              <Link to="/dashboard" className="text-blue-600 block">
                Dashboard
              </Link>
              <button className="text-red-500 mt-2">Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
