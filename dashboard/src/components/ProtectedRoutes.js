import { useEffect, useState } from "react";

import axios from "axios";

function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    axios
      .get(
        "http://localhost:3002/api/auth/me",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setIsAuthenticated(true);
        if (response.data && response.data.username) {
          localStorage.setItem("username", response.data.username);
        }
        setLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!isAuthenticated) {
    window.location.href = "http://localhost:3000/login";
    return null;
  }

  return children;
}

export default ProtectedRoute;