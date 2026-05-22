import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };
  
  const getLinkStyle = (path) => {
    const isActiveLink = isActive(path);
    return {
      color: isActiveLink ? "#0F6FE8" : "#4B5563",
      fontWeight: isActiveLink ? "700" : "500",
      borderBottom: isActiveLink ? "2px solid #0F6FE8" : "none",
      paddingBottom: isActiveLink ? "2px" : "0px",
    };
  };
  
  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#FFFFFF", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}
    >
      <div className="container p-1">
        <Link className="navbar-brand" to="/">
          <img
            src="media/images/logo1.svg"
            style={{ width: "70%" }}
            alt="logo"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <form className="d-flex" role="search">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className="nav-link" to="/signup" style={getLinkStyle("/signup")}>
                  Signup
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/login" style={getLinkStyle("/login")}>
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about" style={getLinkStyle("/about")}>
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/product" style={getLinkStyle("/product")}>
                  Product
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/pricing" style={getLinkStyle("/pricing")}>
                  Pricing
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/support" style={getLinkStyle("/support")}>
                  Support
                </Link>
              </li>

            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;