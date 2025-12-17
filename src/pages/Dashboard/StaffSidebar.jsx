import { Link } from "react-router";
import { FaHome, FaTasks, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

const StaffSidebar = () => {
  const menuItems = [
    { to: "/dashboard/staff-home", label: "Dashboard", icon: <FaHome /> },
    { to: "/dashboard/assigned-issues", label: "Assigned Issues", icon: <FaTasks /> },
    { to: "/dashboard/staff-profile", label: "Profile", icon: <FaUser /> }
  ];

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {menuItems.map((item, index) => (
        <motion.div
          key={item.to}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ x: 10, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            to={item.to} 
            className="flex items-center gap-3 font-medium hover:text-blue-600 text-left transition-all duration-300 p-2 rounded-lg hover:bg-blue-50"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {item.icon}
            </motion.div>
            {item.label}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaffSidebar;
