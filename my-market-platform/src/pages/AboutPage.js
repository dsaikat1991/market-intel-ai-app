// src/pages/AboutPage.js
import React from 'react';
import '../styles/App.css'; // Assuming App.css has general styles or you'll create AboutPage.css

function AboutPage() {
  return (
    <section className="generic-page-placeholder">
      <h1>About</h1>
      <p>At <b>MarketIntel AI</b>, we believe that informed decisions create successful outcomes. Our mission is simple yet powerful — to make reliable, verified, and real‑time business data about Indian companies accessible to everyone, from investors and analysts to entrepreneurs and researchers.</p>
      <div className="about-content">
        <div className="about-section">
          <h3>What We Offer</h3>
          <p>Comprehensive Company Profiles: Detailed insights into Indian businesses from registration details to leadership. 
          <br/><br/>Financial Data & Trends: Balance sheets, funding history, and market performance.
          <br/><br/>AI‑Driven Insights: Advanced analytics and predictive modeling to help you stay ahead of the curve.
          <br/><br/>Competitor & Industry Analysis – Understand the landscape before you make your move.
          </p>
        </div>
        <div className="about-section">
          <h3>Our Mission</h3>
          <p>To simplify access to company data, streamline research processes, and empower users with data‑driven decision‑making tools.</p>
        </div>
        <div className="about-section">
          <h3>Our Vision</h3>
          <p>To become the go‑to source for accurate, transparent, and actionable business intelligence in India—helping individuals and organizations unlock growth opportunities.</p>
        </div>
        <div className="about-section">
          <h3>Our Team</h3>
          <p>To simplify access to company data, streamline research processes, and empower users with data‑driven decision‑making tools.</p>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
