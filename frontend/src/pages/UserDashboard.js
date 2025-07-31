import React from "react";
import { auth } from "../firebase";

function UserDashboard() {
  const user = auth.currentUser;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>User Dashboard</h2>
      <p>Welcome, {user?.email}!</p>
      <p>This page is only for users with the 'user' role.</p>
    </div>
  );
}

export default UserDashboard;
