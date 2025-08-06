// src/components/Navbar.js
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './Navbar.css'; // Import the component-specific CSS
import MarketIntelAILogo from '../components/assets/market-intel-ai-logo.svg'; // 


function Navbar({ user, userRole, profileImageUrl, username, onProfileUpdate }) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();

  // Effect to close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsProfileDropdownOpen(false);
      navigate('/'); // Navigate to home after logout
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={MarketIntelAILogo} alt="Market Intel AI Logo" className="navbar-logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/solution">Solution</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
        {!user ? (
          <>
            {/* Applied the new class name here */}
            <li ><button className='sign-in-button-navbar' onClick={() => navigate('/login')}>Sign In</button></li>
            <li><button className='talk-to-sales-button-navbar' onClick={() => navigate('/contact')}>Talk to Sales</button></li>
          </>
        ) : (
          <li className="navbar-profile-container" ref={profileDropdownRef}>
            <img
              src={profileImageUrl}
              alt="Profile"
              className="profile-pic"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            />
            <span className="username" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>{username}</span>
            {isProfileDropdownOpen && (
              <ul className="profile-dropdown">
                <li><Link to="/profile" onClick={() => setIsProfileDropdownOpen(false)}>View Profile</Link></li>
                <li><Link to="/profile" onClick={() => setIsProfileDropdownOpen(false)}>Edit Profile</Link></li>
                {/* Add more profile-related links here if needed */}
                <li><button onClick={handleLogout} className="dropdown-logout-button">Logout</button></li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
