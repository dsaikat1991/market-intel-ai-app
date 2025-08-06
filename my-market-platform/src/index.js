// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css'; // Global application styles
import App from './App';

// Create a root to render your React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped in React.StrictMode for development checks
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
