import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
// import Home from "../home/Home";
// import Shop from "../shop/Shop";
// import About from "../components/About";
// import Blog from "../components/Blog";
// import SingleBook from "../shop/SingleBook";
// import DashboardLayout from "../dashboard/DashboardLayout";
// import Dashboard from "../dashboard/Dashboard";
// import UploadBook from "../dashboard/UploadBook";
// import ManageBook from "../dashboard/ManageBook";
// import EditBooks from "../dashboard/EditBooks";
// import Signup from "../components/Signup";
// import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";
import { useState, Suspense } from "react";
import React from "react";

const Home = React.lazy(() => import("../home/Home"));
const Shop = React.lazy(() => import("../shop/Shop"));
const About = React.lazy(() => import("../components/About"));
const SingleBook = React.lazy(() => import("../shop/SingleBook"));
const DashboardLayout = React.lazy(() =>
  import("../dashboard/DashboardLayout")
);
const Dashboard = React.lazy(() => import("../dashboard/Dashboard"));
const UploadBook = React.lazy(() => import("../dashboard/UploadBook"));
const ManageBook = React.lazy(() => import("../dashboard/ManageBook"));
const EditBooks = React.lazy(() => import("../dashboard/EditBooks"));
const Signup = React.lazy(() => import("../components/Signup"));
const Login = React.lazy(() => import("../components/Login"));

import { baseURL } from "../../constants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop/",
        element: <Shop />,
      },
      {
        path: "/about/",
        element: <About />,
      },
      {
        path: "/book/:id",
        element: <SingleBook />,
        loader: ({ params }) =>
          fetch(`${baseURL}/books/book/${params.id}`)
            .then((response) => response.json())
            .then((data) => data.book),
      },
    ],
  },

  {
    path: "/admin/dashboard/",
    element: (
      <PrivateRoute>
        <DashboardLayout />{" "}
      </PrivateRoute>
    ),
    children: [
      // {
      //   path: "/admin/dashboard",
      //   element: (
      //     <PrivateRoute>
      //       <Dashboard />
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "/admin/dashboard/upload",
        element: <UploadBook />,
      },
      {
        path: "/admin/dashboard/",
        element: <ManageBook />,
      },
      {
        path: "/admin/dashboard/edit-books/:id",
        element: <EditBooks />,
        loader: ({ params }) =>
          fetch(`${baseURL}/books/book/${params.id}`)
            .then((response) => response.json())
            .then((data) => data.book),
      },
    ],
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

export default router;
