/* global __app_id, __firebase_config, __initial_auth_token */
// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Global variables provided by the Canvas environment
// These variables are automatically injected by the Canvas runtime.
// If running outside Canvas, you would replace them with your actual config.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; // Fallback for local development
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {
  // Your actual Firebase project configuration details
  apiKey: "AIzaSyAKy_v_Sy2ARr5q21rLolzh4NiwU_ACVxQ",
  authDomain: "market-intel-ai-india.firebaseapp.com",
  projectId: "market-intel-ai-india",
  storageBucket: "market-intel-ai-india.firebasestorage.app",
  messagingSenderId: "427391751315",
  appId: "1:427391751315:web:88c954028069eb484ae966",
  measurementId: "G-90Q2VVPZQV" // Added your measurementId
};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services and export them
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Function to handle initial user authentication (custom token or anonymous)
async function initializeAuth() {
  try {
    if (initialAuthToken) {
      // Attempt to sign in with a custom token provided by the Canvas environment
      await signInWithCustomToken(auth, initialAuthToken);
      console.log("Signed in with custom token!");
    } else {
      // If no custom token, sign in anonymously to allow basic access
      await signInAnonymously(auth);
      console.log("Signed in anonymously!");
    }
  } catch (error) {
    console.error("Firebase authentication error:", error);
    // Handle specific errors like 'auth/invalid-custom-token' if needed
  }
}

// Call the authentication initialization function when the module loads
initializeAuth();

// Export appId if needed elsewhere, though usually not directly used in components
export { appId };
