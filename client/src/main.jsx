import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";

import router from "./routers/router.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import { Spinner } from "flowbite-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Suspense
        fallback={
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  </React.StrictMode>
);
