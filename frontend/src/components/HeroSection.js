import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Discover Market Insights Instantly</h1>
        <p>Search and explore key data on 10,000+ companies.</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for a company..." />
          <button>Search</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
