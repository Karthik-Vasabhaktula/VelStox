import axios from "axios";
import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://velstox.onrender.com/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data && response.data.username) {
        localStorage.setItem("username", response.data.username);
      }

      window.location.href = "https://velstox-dashboard.vercel.app";

    } catch (error) {

      alert("Login failed");
    }
  };

  return (
  <div className="auth-container">

    <div className="auth-card">

      <div className="auth-header">

        <img
          src="/media/images/logo1.svg"
          alt="logo"
          className="auth-logo"
        />

        <h2>Welcome Back</h2>

        <p>
          Login to continue trading
        </p>

      </div>

      <form onSubmit={handleLogin}>

        <div className="auth-input-group">

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        <div className="auth-input-group">

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        <button
          type="submit"
          className="auth-btn"
        >
          Login
        </button>

      </form>

      <p className="auth-footer">
        Don't have an account?{" "}

        <a href="/signup">
          Signup
        </a>
      </p>

    </div>

  </div>
);
}

export default Login;
