// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/#features">Features</Link>
        <Link to="/#pricing">Pricing</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/#terms">Terms</Link> {/* Placeholder link */}
        <Link to="/#privacy">Privacy</Link> {/* Placeholder link */}
      </div>
      <div className="social-media-links">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
      </div>
      <p>&copy; 2025 MarketIntel AI. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
