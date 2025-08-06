// src/pages/BlogsPage.js
import React from 'react';
import '../styles/App.css'; // Assuming App.css has general styles or you'll create BlogsPage.css

function BlogsPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Market Research",
      summary: "Explore how artificial intelligence is revolutionizing the way businesses conduct market research and gain insights.",
      date: "July 25, 2025",
      author: "AI Insights Team"
    },
    {
      id: 2,
      title: "Understanding India's Emerging Markets",
      summary: "A deep dive into the key factors driving growth and opportunities in India's rapidly evolving economic landscape.",
      date: "July 18, 2025",
      author: "Market Analysts"
    },
    {
      id: 3,
      title: "Leveraging Financial Data for Strategic Decisions",
      summary: "Learn how to interpret and utilize comprehensive financial data to make informed strategic business decisions.",
      date: "July 10, 2025",
      author: "Finance Experts"
    }
  ];

  return (
    <section className="generic-page-placeholder">
      <h2>Our Latest Blogs</h2>
      <p>Stay updated with the latest trends, insights, and news from MarketIntel AI.</p>
      <div className="blogs-grid">
        {blogPosts.map(post => (
          <div key={post.id} className="blog-card">
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <div className="blog-meta">
              <span>By {post.author}</span> | <span>{post.date}</span>
            </div>
            <button className="read-more-button">Read More</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogsPage;
