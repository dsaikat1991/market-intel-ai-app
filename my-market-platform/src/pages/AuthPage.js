// src/pages/AuthPage.js
import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'; // Ensure correct path
import '../styles/Auth.css'; // Specific styles for Auth page
import GoogleLogo from './assets/images/googleLogo.png'; // Import your local Google logo

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleAuthAction = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('Logged in successfully!');
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          email: user.email,
          role: 'freemium', // Default role for new users
          displayName: user.email ? user.email.split('@')[0] : 'User', // Default username
          profilePictureUrl: 'https://placehold.co/50x50/cccccc/333333?text=👤', // Default profile picture
          createdAt: new Date(),
        });
        setMessage('Registered successfully! You are now logged in.');
      }
      onAuthSuccess(auth.currentUser); // Notify App.js of successful authentication
    } catch (err) {
      console.error("Auth error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          role: 'freemium',
          displayName: user.displayName || (user.email ? user.email.split('@')[0] : 'User'),
          profilePictureUrl: user.photoURL || 'https://placehold.co/50x50/cccccc/333333?text=👤',
          createdAt: new Date(),
        });
      }
      setMessage('Signed in with Google successfully!');
      onAuthSuccess(auth.currentUser);
    } catch (err) {
      console.error("Google sign-in error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (err) {
      console.error("Password reset error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-left-panel">
        <h1 className="auth-main-heading">Unlock India's Business Insights</h1>
        <p className="auth-description">
          Log in to explore accurate company data, deep financials, and insights trusted by investors and analysts.
        </p>
      </div>
      <div className="auth-right-panel">
        <div className="auth-container">
          {showForgotPassword ? (
            <div className="forgot-password-container">
              <h2>Reset Your Password</h2>
              <p>Enter your email address to receive a password reset link.</p>
              <form onSubmit={handleForgotPassword}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="auth-submit-button" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Email'}
                </button>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                <p className="auth-toggle-text">
                  Remember your password?{' '}
                  <span className="toggle-auth" onClick={() => setShowForgotPassword(false)}>
                    Back to Login
                  </span>
                </p>
              </form>
            </div>
          ) : (
            <>
              <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
              <form onSubmit={handleAuthAction}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {!isLogin && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                )}
                <button type="submit" className="auth-submit-button" disabled={loading}>
                  {loading ? (isLogin ? 'Signing In...' : 'Registering...') : (isLogin ? 'Sign In' : 'Register')}
                </button>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
              </form>

              {isLogin && (
                <p className="auth-toggle-text">
                  <span className="toggle-auth" onClick={() => setShowForgotPassword(true)}>
                    Forgot Password?
                  </span>
                </p>
              )}

              <div className="auth-divider">OR</div>

              <div className="social-auth">
                <button onClick={handleGoogleSignIn} className="google-button" disabled={loading}>
                  <img src={GoogleLogo} alt="Google logo" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                  {loading ? 'Signing in with Google...' : 'Sign in with Google'}
                </button>
              </div>

              <p className="auth-toggle-text">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <span className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Register' : 'Sign In'}
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
