// src/App.js
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import KeyFeatures from './components/KeyFeatures';
import HowItWorks from './components/HowItWorks';
import DataSources from './components/DataSources';
import PricingPlans from './components/PricingPlans';
import SamplePreview from './components/SamplePreview';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';

// Import Pages
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';

import SolutionPage from './pages/SolutionPage';
import AboutPage from './pages/AboutPage';
import BlogsPage from './pages/BlogsPage';
import CompanyDataPage from './pages/CompanyDataPage';
import SearchResultsPage from './pages/SearchResultsPage';

import './styles/App.css'; // Global styles

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('https://placehold.co/50x50/cccccc/333333?text=👤');
  const [username, setUsername] = useState('User');
  const navigate = useNavigate(); // useNavigate must be inside BrowserRouter

  // Effect to handle user authentication state changes and ensure user document integrity
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        let userData = {};

        if (userDocSnap.exists()) {
          userData = userDocSnap.data();
          setUserRole(userData.role);
          setProfileImageUrl(userData.profilePictureUrl || 'https://placehold.co/50x50/cccccc/333333?text=👤');
          setUsername(userData.displayName || (currentUser.email ? currentUser.email.split('@')[0] : 'User'));
        } else {
          // If user document doesn't exist (e.g., new Google user), create it with default role and profile
          const defaultUsername = currentUser.email ? currentUser.email.split('@')[0] : 'User';
          const defaultProfilePic = currentUser.photoURL || 'https://placehold.co/50x50/cccccc/333333?text=👤';

          await setDoc(userDocRef, {
            email: currentUser.email,
            role: 'freemium', // Default role for new users
            displayName: defaultUsername,
            profilePictureUrl: defaultProfilePic,
            createdAt: new Date(),
          }, { merge: true }); // Use merge to avoid overwriting if doc partially exists

          setUserRole('freemium');
          setProfileImageUrl(defaultProfilePic);
          setUsername(defaultUsername);
        }
      } else {
        setUserRole(null);
        setProfileImageUrl('https://placehold.co/50x50/cccccc/333333?text=👤');
        setUsername('User');
      }
      setAuthInitialized(true);
    });
    return () => unsubscribe();
  }, []);

  // Function to update profile image and username from ProfilePage
  const handleProfileUpdate = (newImageUrl, newUsername) => {
    setProfileImageUrl(newImageUrl);
    setUsername(newUsername);
  };

  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    // After successful auth, the onAuthStateChanged listener will update userRole etc.
    navigate('/'); // Navigate to home after successful login/signup
  };

  // Show a loading screen until authentication state is initialized
  if (!authInitialized) {
    return <div className="loading-screen">Loading application...</div>;
  }

  return (
    <div className="App">
      {/* Navbar is always visible */}
      <Navbar
        user={user}
        userRole={userRole}
        profileImageUrl={profileImageUrl}
        username={username}
        onProfileUpdate={handleProfileUpdate} // Pass handler to Navbar for profile dropdown
      />

      {/* Routes define the different pages */}
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection user={user} />
            <KeyFeatures />
            <HowItWorks />
            <DataSources />
            <PricingPlans />
            <SamplePreview />
            <Testimonials />
            <CallToAction />
          </>
        } />
        <Route path="/login" element={<AuthPage onAuthSuccess={handleAuthSuccess} />} />
        <Route path="/solution" element={<SolutionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route
          path="/profile"
          element={user ? (
            <ProfilePage user={user} onUpdateUserRole={setUserRole} onProfileUpdate={handleProfileUpdate} />
          ) : (
            <AuthPage onAuthSuccess={handleAuthSuccess} />
          )}
        />
        <Route path="/company/:companyId" element={<CompanyDataPage />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
        {/* Admin route - only accessible if userRole is 'admin' */}
        <Route path="/admin" element={userRole === 'admin' ? (
          <section className="generic-page-placeholder">
            <h2>Admin Panel</h2>
            <p>Welcome, Administrator! This is where you can manage application data and user roles.</p>
            <p>This page is only visible to users with 'admin' role.</p>
          </section>
        ) : (
          <section className="generic-page-placeholder">
            <h2>Access Denied</h2>
            <p>You do not have permission to view this page.</p>
            <button className="sign-in-button" onClick={() => navigate('/')}>Go to Home</button>
          </section>
        )} />
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={
          <section className="generic-page-placeholder">
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <button className="sign-in-button" onClick={() => navigate('/')}>Go to Home</button>
          </section>
        } />
      </Routes>

      {/* Footer is always visible */}
      <Footer />
    </div>
  );
}

// Wrap App component with BrowserRouter for routing context
// This is crucial for useNavigate and other React Router hooks to work.
function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
