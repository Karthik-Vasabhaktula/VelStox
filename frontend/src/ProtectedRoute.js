import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {

    try {
      await axios.get(
        "https://velstox.onrender.com/api/auth/me",
        {
          withCredentials: true,
        }
      );

      setIsAuthenticated(true);

    } catch (error) {

      setIsAuthenticated(false);

    }
  };

  if (isAuthenticated === null) {
    return <h3>Loading...</h3>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
