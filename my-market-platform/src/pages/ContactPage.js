// src/pages/ContactPage.js
import React from 'react';
import '../styles/App.css'; // Assuming App.css has general styles or you'll create ContactPage.css

function ContactPage() {
  return (
    <section className="generic-page-placeholder">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.</p>

      <div className="contact-details">
        <p><strong>Email:</strong> support@marketintelai.com</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Address:</strong> 123 Market Street, Bengaluru, India</p>
      </div>

      <form className="contact-form-placeholder">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <input type="text" placeholder="Subject" required />
        <textarea placeholder="Your Message" rows="5" required></textarea>
        <button type="submit" className="contact-submit-button">Send Message</button>
      </form>
    </section>
  );
}

export default ContactPage;
