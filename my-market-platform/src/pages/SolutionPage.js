// src/pages/SolutionPage.js
import React from 'react';
import '../styles/App.css'; // Assuming App.css has general styles or you'll create SolutionPage.css

function SolutionPage() {
  return (
    <section className="generic-page-placeholder">
      <h1>Our Solutions</h1>
      <p>Discover how MarketIntel AI can empower your business with data-driven insights.</p>
      <div className="solution-features-grid">
        <div className="solution-feature-card">
          <h3>Comprehensive Company Profiles</h3>
          <p>Access detailed information on millions of Indian companies, including financials, directors, and compliance history.</p>
        </div>
        <div className="solution-feature-card">
          <h3>AI-Powered Market Analysis</h3>
          <p>Utilize advanced AI algorithms to identify market trends, competitive landscapes, and growth opportunities.</p>
        </div>
        <div className="solution-feature-card">
          <h3>Customizable Reporting</h3>
          <p>Generate tailored reports with specific data points and visualizations to meet your unique research needs.</p>
        </div>
        <div className="solution-feature-card">
          <h3>Real-time Data Updates</h3>
          <p>Stay ahead with constantly updated data from official sources, ensuring you always have the latest information.</p>
        </div>
      </div>
    </section>
  );
}

export default SolutionPage;
