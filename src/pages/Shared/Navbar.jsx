import React, { useState } from "react";
import { Link, NavLink } from "react-router";


const Navbar = () => {
  const [open, setOpen] = useState(false);

  const user = null; // Replace with actual auth

  return (
    <nav className="w-full bg-white border-b border-slate-200 py-4">
      <div className="flex items-center justify-between px-4">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CityFix
        </Link>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-6 text-gray-700">
          <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
          <NavLink to="/issues" className="hover:text-blue-600">All Issues</NavLink>
          <NavLink to="/extra-1" className="hover:text-blue-600">Extra 1</NavLink>
          <NavLink to="/extra-2" className="hover:text-blue-600">Extra 2</NavLink>
        </div>

        {/* PROFILE */}
        <div>
          {!user ? (
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL}
                className="h-10 w-10 rounded-full cursor-pointer"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className="absolute right-0 bg-white shadow-md p-4 w-40 rounded-lg">
                  <p>{user.displayName}</p>
                  <Link to="/dashboard">Dashboard</Link>
                  <button>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
