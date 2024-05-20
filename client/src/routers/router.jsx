import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import SingleBook from "../shop/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout";

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
        path: "/blog/",
        element: <Blog />,
      },
      {
        path: "/book/:id",
        element: <SingleBook />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/books/book/${params.id}`)
            .then((response) => response.json())
            .then((data) => data.book),
      },
    ],
  },

  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
  },
]);

export default router;
