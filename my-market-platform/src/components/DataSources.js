// src/components/DataSources.js
import React from 'react';

function DataSources() {
  return (
    <section className="data-sources-section">
      <h2>Data Sources & Reliability</h2>
      <div className="sources-logos">
        <div className="source-logo">
          <img src="https://placehold.co/100x50/cccccc/333333?text=MCA" alt="MCA Logo" />
          <span>MCA</span>
        </div>
        <div className="source-logo">
          <img src="https://placehold.co/100x50/cccccc/333333?text=SEBI" alt="SEBI Logo" />
          <span>SEBI</span>
        </div>
        <div className="source-logo">
          <img src="https://placehold.co/100x50/cccccc/333333?text=RBI" alt="RBI Logo" />
          <span>RBI</span>
        </div>
        <div className="source-logo">
          <img src="https://placehold.co/100x50/cccccc/333333?text=Industry Reports" alt="Industry Reports Logo" />
          <span>Industry Reports</span>
        </div>
      </div>
      <p className="reliability-text">
        We ensure the highest accuracy by sourcing data directly from official government bodies and reputable industry reports. Our robust verification processes guarantee reliable and secure information for your critical decisions.
      </p>
    </section>
  );
}

export default DataSources;
