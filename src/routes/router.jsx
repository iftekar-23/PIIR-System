import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllIssues from "../pages/AllIssues";
import PrivateRoute from "./PrivateRoute";
import IssueDetails from "../pages/IssueDetails";
import BoostSuccess from "../pages/BoostSuccess";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import StaffRoute from "./StaffRoute";
import StaffHome from "../pages/Dashboard/Staff/StaffHome";
import CitizenRoute from "./CitizenRoute";
import CitizenHome from "../pages/Dashboard/Citizen/CitizenHome";
import MyIssues from "../pages/Dashboard/Citizen/MyIssues";
import SubmitIssue from "../pages/Dashboard/Citizen/SubmitIssue";
import Profile from "../pages/Dashboard/Citizen/Profile";
import AssignedIssues from "../pages/Dashboard/Staff/AssignedIssues";
import StaffProfile from "../pages/Dashboard/Staff/StaffProfile";
import AdminIssues from "../pages/Dashboard/Admin/AdminIssues";
import AdminUsers from "../pages/Dashboard/Admin/AdminUsers";
import AdminStaff from "../pages/Dashboard/Admin/AdminStaff";
import AdminPayments from "../pages/Dashboard/Admin/AdminPayments";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import SubscribeSuccess from "../pages/Dashboard/Citizen/SubscribeSuccess";
import FeedbackForm from "../pages/Dashboard/Citizen/FeedbackForm";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        children: ([
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: "/issues",
                element: <AllIssues />,
                // loader: () => fetch("/issues.json").then(res => res.json())
            },
            {
                path: 'issue/:id',
                element: <PrivateRoute><IssueDetails></IssueDetails></PrivateRoute>
            },
            {
                path: "/boost-success",
                element: <BoostSuccess />
            },
            {
                path: "/subscribe-success",
                element: <SubscribeSuccess />
            }
        ])
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [

            {
                path: "admin-home",
                element: (
                    <AdminRoute>
                        <AdminHome />
                    </AdminRoute>
                ),
            },
            { path: 'all-issues', element: <AdminRoute><AdminIssues /></AdminRoute> },
            { path: 'admin-users', element: <AdminRoute><AdminUsers /></AdminRoute> },
            { path: 'manage-staff', element: <AdminRoute><AdminStaff /></AdminRoute> },
            { path: 'payments', element: <AdminRoute><AdminPayments /></AdminRoute> },
            { path: 'profile', element: <AdminRoute><AdminProfile /></AdminRoute> },
            {
                path: "staff-home",
                element: (
                    <StaffRoute>
                        <StaffHome />
                    </StaffRoute>
                ),
            },
            {
                path: "assigned-issues",
                element: (
                    <StaffRoute>
                        <AssignedIssues />
                    </StaffRoute>
                ),
            },
            {
                path: "staff-profile",
                element: (
                    <StaffRoute>
                        <StaffProfile />
                    </StaffRoute>
                ),
            },
            {
                path: "citizen-home",
                element: (
                    <CitizenRoute>
                        <CitizenHome />
                    </CitizenRoute>
                ),
            },
            {
                path: "my-issues",
                element: (
                    <CitizenRoute>
                        <MyIssues />
                    </CitizenRoute>
                ),
            },
            {
                path: "submit-issue",
                element: (
                    <CitizenRoute>
                        <SubmitIssue />
                    </CitizenRoute>
                ),
            },
            {
                path: "citizen-profile",
                element: (
                    <CitizenRoute>
                        <Profile />
                    </CitizenRoute>
                ),
            },
            {
                path: "citizen-rating",
                element: (
                    <CitizenRoute>
                        <FeedbackForm />
                    </CitizenRoute>
                ),
            },
            
        ]
    }
])