import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Swal from "sweetalert2";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role, loading } = useRole();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // GSAP navbar entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // Logo bounce animation
    gsap.fromTo(
      logoRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)", delay: 0.3 }
    );
  }, []);

  const isDashboard = location.pathname.startsWith("/dashboard");

  const dashboardLink = {
    admin: "/dashboard/admin-home",
    staff: "/dashboard/staff-home",
    citizen: "/dashboard/citizen-home",
  };

  const navItemStyle = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-blue-600 bg-blue-50"
        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
    }`;

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      logOut();
      Swal.fire("Logged out!", "You have been logged out successfully.", "success");
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <motion.nav
        ref={navRef}
        className="max-w-7xl mx-auto"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between px-4 md:px-8 h-16">
        {/* LOGO */}
        <motion.div
          ref={logoRef}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="text-2xl font-bold text-blue-600">
            CityFix
          </Link>
        </motion.div>

        {/* DESKTOP MENU */}
        <motion.div
          className="hidden md:flex items-center gap-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {!isDashboard && (
            <>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <NavLink to="/" className={navItemStyle}>
                  Home
                </NavLink>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <NavLink to="/issues" className={navItemStyle}>
                  Issues
                </NavLink>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <NavLink to="/about" className={navItemStyle}>
                  About
                </NavLink>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <NavLink to="/contact" className={navItemStyle}>
                  Contact
                </NavLink>
              </motion.div>
            </>
          )}

          {/* PROFILE DROPDOWN */}
          {!user ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Login
              </Link>
            </motion.div>
          ) : (
            <div className="relative">
              <motion.button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {user.photoURL ? (
                  <motion.img
                    src={user.photoURL}
                    alt="profile"
                    className="w-9 h-9 rounded-full border"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  />
                ) : (
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaUserCircle className="text-3xl" />
                  </motion.div>
                )}
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg p-3 space-y-2"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {user.displayName || "User"}
                    </p>
                    {!loading && (
                      <motion.div whileHover={{ x: 5 }}>
                        <Link
                          to={dashboardLink[role]}
                          className="block text-blue-600 font-medium hover:underline"
                        >
                          Dashboard
                        </Link>
                      </motion.div>
                    )}
                    <motion.button
                      onClick={handleLogout}
                      className="w-full text-center text-red-500 font-medium py-1 hover:bg-red-50 rounded transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Logout
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* MOBILE MENU BUTTON */}
        <motion.button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: menuOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden px-4 pb-4 space-y-4 border-t"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {!isDashboard && (
              <>
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <NavLink to="/" className={navItemStyle}>
                    Home
                  </NavLink>
                </motion.div>
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <NavLink to="/issues" className={navItemStyle}>
                    Issues
                  </NavLink>
                </motion.div>
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <NavLink to="/about" className={navItemStyle}>
                    About
                  </NavLink>
                </motion.div>
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <NavLink to="/contact" className={navItemStyle}>
                    Contact
                  </NavLink>
                </motion.div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    </div>
  );
};

export default Navbar;