import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <h3>Market Intel AI</h3>
          <p>Smart insights. Smarter decisions.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li><a href="/features">Features</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/api-access">API Access</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="/help-center">Help Center</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/status">Status</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Market Intel AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
