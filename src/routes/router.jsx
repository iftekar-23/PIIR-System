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
            }
        ])
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "admin-home",
                element: (
                    <AdminRoute>
                        <AdminHome />
                    </AdminRoute>
                ),
            },
            {
                path: "staff-home",
                element: (
                    <StaffRoute>
                        <StaffHome />
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
        ]
    }
])