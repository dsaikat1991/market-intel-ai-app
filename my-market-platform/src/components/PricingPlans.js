// src/components/PricingPlans.js
import React from 'react';

function PricingPlans() {
  return (
    <section className="pricing-section">
      <h2>Our Flexible Pricing Plans</h2>
      <div className="pricing-table">
        <div className="pricing-card">
          <h3>Freemium</h3>
          <p className="price">Free</p>
          <ul className="features-list">
            <li>View Company Name</li>
            <li>Found Date & Sector</li>
            <li>Headquarters & Key Officials</li>
            <li className="unavailable">Financials (Limited)</li>
            <li className="unavailable">Press Releases (Limited)</li>
            <li className="unavailable">Graphical Representations</li>
            <li className="unavailable">Report Generation</li>
          </ul>
          <button className="pricing-button primary">Current Plan</button>
        </div>

        <div className="pricing-card featured">
          <h3>Premium</h3>
          <p className="price">$49<span>/month</span></p>
          <ul className="features-list">
            <li>All Freemium features</li>
            <li>Full Financials Access</li>
            <li>Comprehensive Press Releases</li>
            <li>Basic Graphical Overviews</li>
            <li className="unavailable">Advanced Analytics</li>
            <li className="unavailable">Custom Report Generation</li>
          </ul>
          <button className="pricing-button">Choose Premium</button>
        </div>

        <div className="pricing-card">
          <h3>Enterprise</h3>
          <p className="price">Custom</p>
          <ul className="features-list">
            <li>All Premium features</li>
            <li>Advanced Graphical Analytics</li>
            <li>Custom Report Generation</li>
            <li>Dedicated Support</li>
            <li>API Access</li>
            <li>Team Management</li>
          </ul>
          <button className="pricing-button">Contact Sales</button>
        </div>
      </div>
    </section>
  );
}

export default PricingPlans;
