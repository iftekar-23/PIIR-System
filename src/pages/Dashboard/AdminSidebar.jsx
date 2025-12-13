import { Link } from "react-router";
import { FaUsers, FaTasks, FaMoneyBill } from "react-icons/fa";

const AdminSidebar = () => (
  <div className="space-y-4">
    <Link to="/dashboard/admin-home" className="block font-medium hover:text-blue-600 text-left">Dashboard</Link>
    <Link to="/dashboard/all-issues" className="block font-medium hover:text-blue-600 text-left">All Issues</Link>
    <Link to="/dashboard/manage-staff" className="block font-medium hover:text-blue-600 text-left">Manage Staff</Link>
    <Link to="/dashboard/payments" className="block font-medium hover:text-blue-600 text-left">Payments</Link>
    <Link to="/dashboard/profile" className="block font-medium hover:text-blue-600 text-left">Profile</Link>
  </div>
);

export default AdminSidebar;
