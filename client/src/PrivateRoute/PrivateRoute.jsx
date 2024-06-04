import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "flowbite-react";

function PrivateRoute({ children }) {
  const { user, loading, token } = useContext(AuthContext);

  const loaction = useLocation();
  console.log(user, loading, token);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  if (user && token) {
    return children;
  }

  return <Navigate to="/login" state={{ from: loaction }} replace></Navigate>;
}

export default PrivateRoute;
