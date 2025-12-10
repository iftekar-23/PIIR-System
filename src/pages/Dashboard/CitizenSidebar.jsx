import { Link } from "react-router";

const CitizenSidebar = () => (
  <div className="space-y-4">
    <Link to="/dashboard/citizen-home" className="block font-medium hover:text-blue-600 text-left">Dashboard</Link>
    <Link to="/dashboard/my-issues" className="block font-medium hover:text-blue-600 text-left">My Issues</Link>
    <Link to="/dashboard/submit-issue" className="block font-medium hover:text-blue-600 text-left">Submit Issue</Link>
    <Link to="/dashboard/premium" className="block font-medium hover:text-blue-600 text-left">Premium</Link>
    <Link to="/dashboard/profile " className="block font-medium hover:text-blue-600 text-left">Profile</Link>
  </div>
);

export default CitizenSidebar;
