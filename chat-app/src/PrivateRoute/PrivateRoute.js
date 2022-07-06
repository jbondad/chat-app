import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const loggedIn = localStorage.getItem("usr") !== null;
  return !loggedIn ? children : <Navigate to="/Chat" />;
};

export default PrivateRoute;
