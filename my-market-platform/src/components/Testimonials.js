// src/components/Testimonials.js
import React from 'react';

function Testimonials() {
  return (
    <section className="testimonials-section">
      <h2>What Our Users Say</h2>
      <div className="testimonials-grid">
        <div className="testimonial-card">
          <p className="quote">"MarketIntel AI has revolutionized our market research. The AI insights are incredibly precise and save us hours!"</p>
          <p className="author">- Priya Sharma, Lead Analyst at InvestPro</p>
        </div>
        <div className="testimonial-card">
          <p className="quote">"The verified data and competitor analysis features are game-changers for our strategic planning."</p>
          <p className="author">- Rohan Mehta, Startup Founder, InnovateTech</p>
        </div>
        <div className="testimonial-card">
          <p className="quote">"Access to comprehensive financials and custom reports has streamlined our due diligence process significantly."</p>
          <p className="author">- Dr. Ananya Singh, VC Partner, GrowthVentures</p>
        </div>
      </div>

      <h3 className="use-cases-heading">Who Benefits?</h3>
      <div className="use-cases-list">
        <div className="use-case-item">
          <div className="use-case-icon">🏢</div>
          <h4>VC Firms</h4>
          <p>Streamline due diligence and identify high-potential startups.</p>
        </div>
        <div className="use-case-item">
          <div className="use-case-icon">⚖️</div>
          <h4>Law Firms</h4>
          <p>Conduct thorough background checks and compliance research.</p>
        </div>
        <div className="use-case-item">
          <div className="use-case-icon">🔬</div>
          <h4>Research Agencies</h4>
          <p>Enhance market studies with verified, deep-dive data.</p>
        </div>
        <div className="use-case-item">
          <div className="use-case-icon">💼</div>
          <h4>Consultants</h4>
          <p>Provide data-backed strategies and market entry advice.</p>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
