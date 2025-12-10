import { Link } from "react-router";

const StaffSidebar = () => (
  <div className="space-y-4">
    <Link to="/dashboard/staff-home" className="block font-medium hover:text-blue-600 text-left">Dashboard</Link>
    <Link to="/dashboard/assigned-issues" className="block font-medium hover:text-blue-600 text-left">Assigned Issues</Link>
    <Link to="/dashboard/update-progress" className="block font-medium hover:text-blue-600 text-left ">Update Progress</Link>
    <Link to="/dashboard/profile" className="block font-medium hover:text-blue-600 text-left">Profile</Link>
  </div>
);

export default StaffSidebar;
