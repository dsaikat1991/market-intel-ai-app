// src/components/HowItWorks.js
import React from 'react';

function HowItWorks() {
  return (
    <section className="how-it-works-section">
      <h2>How It Works</h2>
      <div className="steps-container">
        <div className="step-item">
          <div className="step-number">1</div>
          <div className="step-icon">🔍</div>
          <h3>Search Any Indian Company</h3>
          <p>Simply enter the company name, ticker, or CIN to find its profile.</p>
        </div>
        <div className="step-arrow">→</div>
        <div className="step-item">
          <div className="step-number">2</div>
          <div className="step-icon">🧠</div>
          <h3>View AI-Generated Insights & Charts</h3>
          <p>Get instant access to AI-summarized data, key financials, and interactive charts.</p>
        </div>
        <div className="step-arrow">→</div>
        <div className="step-item">
          <div className="step-number">3</div>
          <div className="step-icon">📊</div>
          <h3>Download Reports or Integrate Data</h3>
          <p>Export detailed reports or seamlessly integrate data into your existing workflows.</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
