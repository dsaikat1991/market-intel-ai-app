import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import AdminPage from './pages/AdminPage'; // ⬅️ Add this import
import CompanyDetails from "./pages/CompanyDetails"; // import the page
import SearchPage from './pages/SearchPage';
import SignupPage from './pages/SignupPage';
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard'; // ⬅️ Add this
import AdminCompaniesPage from "./pages/AdminCompaniesPage";
import AdminAddCompanyPage from "./pages/AdminAddCompanyPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminPage /></ProtectedRoute>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/company/:id" element={<CompanyDetails />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admindashboard"
         element={
         <ProtectedRoute requiredRole="admin">
         <AdminDashboard />
        </ProtectedRoute>
       }
        />
        <Route
  path="/admin/companies"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminCompaniesPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/add"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminAddCompanyPage />
    </ProtectedRoute>
  }
/>
        {/* Add more routes here */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
