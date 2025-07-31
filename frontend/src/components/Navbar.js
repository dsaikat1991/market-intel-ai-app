import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/#features">Features</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
      </ul>

      <div className="navbar-right">
        {user ? (
          <button className="login-button" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="login-button" onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
