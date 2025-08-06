// src/components/SamplePreview.js
import React from 'react';

function SamplePreview() {
  return (
    <section className="sample-preview-section">
      <h2>Sample Company Profile Preview</h2>
      <div className="mockup-container">
        <div className="mockup-header">
          <h3>Acme Corp. Overview</h3>
          <span className="mockup-tag">Tech | NASDAQ</span>
        </div>
        <div className="mockup-content">
          <div className="mockup-section">
            <h4>Key Information</h4>
            <p><strong>Founded:</strong> 2005</p>
            <p><strong>Headquarters:</strong> Bengaluru, India</p>
            <p><strong>Sector:</strong> Software Development</p>
          </div>
          <div className="mockup-section">
            <h4>Financial Snapshot</h4>
            <p><strong>Revenue (2024):</strong> $500M</p>
            <p><strong>Net Profit (2024):</strong> $80M</p>
            <p><strong>Market Cap:</strong> $5B</p>
          </div>
          <div className="mockup-section chart-placeholder">
            <h4>Revenue Growth</h4>
            <img src="https://placehold.co/300x150/f0f0f0/333333?text=Chart+Placeholder" alt="Revenue Growth Chart" />
          </div>
          <div className="mockup-section">
            <h4>Recent Press Release</h4>
            <p className="mockup-news-headline">Acme Corp. Announces Strategic Partnership with Global AI Leader.</p>
            <p className="mockup-news-summary">Collaboration aims to integrate advanced AI capabilities into upcoming product lines, boosting market competitiveness.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SamplePreview;
