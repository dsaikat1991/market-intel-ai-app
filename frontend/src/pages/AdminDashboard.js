// src/pages/AdminDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // You'll create styling here later
import { auth } from "../firebase";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  return (
    <div className="admin-dashboard">
      {/* Left Sidebar */}
      <div className="admin-sidebar">
        <div className="profile-section">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="profile-picture"
          />
          <h3>{user?.displayName || "Admin User"}</h3>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Password:</strong> ********</p>
          <button>Edit Profile</button>
        </div>
      </div>

      {/* Right Main Section */}
      <div className="admin-main">
        <h2>Admin Dashboard</h2>
        <div className="admin-cards">
          <div className="admin-card" onClick={() => navigate("/admin/companies")}>
            <h3>📋 View All Companies</h3>
            <p>Browse and manage all company data</p>
          </div>
          <div className="admin-card" onClick={() => navigate("/admin/add")}>
            <h3>➕ Add New Company</h3>
            <p>Insert a new company into the database</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
