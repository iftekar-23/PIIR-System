import { Link } from "react-router";
import { FaHome, FaList, FaPlus, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { MdFeedback } from "react-icons/md";

const CitizenSidebar = () => {
  const menuItems = [
    { to: "/dashboard/citizen-home", label: "Dashboard", icon: <FaHome /> },
    { to: "/dashboard/my-issues", label: "My Issues", icon: <FaList /> },
    { to: "/dashboard/submit-issue", label: "Submit Issue", icon: <FaPlus /> },
    { to: "/dashboard/citizen-profile", label: "Profile", icon: <FaUser /> },
    { to: "/dashboard/citizen-rating", label: "Rating", icon: <MdFeedback />}
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

export default CitizenSidebar;
