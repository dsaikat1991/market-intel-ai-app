// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWuspjtKUzI_q4c8K3RK7ppuYEIyEJsEA",
  authDomain: "market-intel-ai-app.firebaseapp.com",
  projectId: "market-intel-ai-app",
  storageBucket: "market-intel-ai-app.firebasestorage.app",
  messagingSenderId: "844847306068",
  appId: "1:844847306068:web:c062912e07d55f3eb9a4c1",
  measurementId: "G-Q6JZ2T9R1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);
export const auth = getAuth(app); 