// src/components/CallToAction.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <h2>Start your free trial today — Get access to 100+ Indian company profiles</h2>
      <button className="cta-button" onClick={() => navigate('/login')}>Sign Up Now</button>
    </section>
  );
}

export default CallToAction;
