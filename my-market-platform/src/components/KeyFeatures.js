// src/components/KeyFeatures.js
import React from 'react';

function KeyFeatures() {
  return (
    <section className="key-features-section">
      <h2>Key Features</h2>
      <div className="feature-cards">
        <div className="feature-card">
          <div className="icon-placeholder">💡</div>
          <h3>AI-powered Company Insights</h3>
          <p>Uncover patterns, predict trends, and get actionable insights using AI‑powered analytics.</p>
        </div>
        <div className="feature-card">
          <div className="icon-placeholder">✅</div>
          <h3>Verified Data from Trusted Sources</h3>
          <p>Access accurate and reliable data directly from official sources like MCA, SEBI, and RBI.</p>
        </div>
        <div className="feature-card">
          <div className="icon-placeholder">📈</div>
          <h3>Funding & Financial Insights</h3>
          <p>Analyze funding rounds, financial health, and performance metrics with detailed breakdowns.</p>
        </div>
        <div className="feature-card">
          <div className="icon-placeholder">⚔️</div>
          <h3>Competitor & Risk Analysis</h3>
          <p>Identify market position, competitive landscape, and potential risks for informed strategies.</p>
        </div>
      </div>
    </section>
  );
}

export default KeyFeatures;
