import React from 'react';
import './FeaturesSection.css';

const Features = () => {
  return (
    <section className="features-section">
      <h2>Why Choose Market Intel AI?</h2>
      <div className="features-container">
        <div className="feature-card">
          <div className="icon">📊</div>
          <h3>Real-time Market Insights</h3>
          <p>Access updated company profiles, financials, and sector insights.</p>
        </div>
        <div className="feature-card">
          <div className="icon">🧠</div>
          <h3>AI-Powered Intelligence</h3>
          <p>Leverage AI to generate charts, summaries, and risk assessments.</p>
        </div>
        <div className="feature-card">
          <div className="icon">🔒</div>
          <h3>Secure & Tiered Access</h3>
          <p>Freemium to enterprise-level access tailored to your needs.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
