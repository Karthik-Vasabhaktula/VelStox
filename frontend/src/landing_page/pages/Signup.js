import axios from "axios";
import { useState } from "react";
import "../Auth.css";

function Signup() {

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:3002/api/auth/signup",
        {
          username,
          email,
          password,
        }
      );

      alert("Signup successful");

      window.location.href = "/login";

    } catch (error) {

      alert("Signup failed");
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

        <h2>Create Account</h2>

        <p>
          Start your trading journey with VelStox
        </p>

      </div>

      <form onSubmit={handleSignup}>

        <div className="auth-input-group">

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

        </div>

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
          Signup
        </button>

      </form>

      <p className="auth-footer">
        Already have an account?{" "}

        <a href="/login">
          Login
        </a>
      </p>

    </div>

  </div>
);
}

export default Signup;