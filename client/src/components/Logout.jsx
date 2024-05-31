import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";

function Logout() {
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(location.pathname);
  const from = location.state?.from?.pathname || "/";
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    logout().then(() => {
      navigate(from, { replace: true });
    });
  }, []);

  return <div></div>;
}

export default Logout;
