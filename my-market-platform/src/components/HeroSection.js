// src/components/HeroSection.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ensure this path is correct

function HeroSection({ user, onSearch }) {
  const [symbol, setSymbol] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Handle clicks outside the search dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = async (e) => {
    const value = e.target.value.toUpperCase();
    setSymbol(value);
    setSearchError(null);

    if (value.length > 1) { // Start searching after 1 character
      setLoadingSearch(true);
      try {
        const companiesRef = collection(db, "companies");
        // Perform a case-insensitive search by converting to lowercase for comparison
        // Note: Firestore does not support case-insensitive queries directly without creating
        // a lowercase field. For simplicity, we'll assume exact match or handle case in client.
        // For a more robust solution, you'd store a 'searchableName' field in lowercase.

        // Attempt to find by companyName, ticker, or CIN
        let q = query(companiesRef, where("companyName", "==", value));
        let snapshot = await getDocs(q);

        if (snapshot.empty) {
          q = query(companiesRef, where("ticker", "==", value));
          snapshot = await getDocs(q);
        }

        if (snapshot.empty) {
          q = query(companiesRef, where("cin", "==", value));
          snapshot = await getDocs(q);
        }

        const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSearchResults(results);
        setShowDropdown(true); // Show dropdown if there are results
      } catch (err) {
        console.error("Error searching companies:", err);
        setSearchError("Failed to search companies.");
        setSearchResults([]);
      } finally {
        setLoadingSearch(false);
      }
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleSelectCompany = (companyId) => {
    setShowDropdown(false);
    navigate(`/company/${companyId}`); // Navigate to detailed company page
  };

  const handleSearchAll = () => {
    if (!symbol.trim()) {
      setSearchError('Please enter a search query.');
      return;
    }
    setShowDropdown(false);
    navigate(`/search-results?query=${symbol}`); // Navigate to general search results page
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (searchResults.length > 0 && showDropdown) {
        // If there are results and dropdown is visible, select the first one
        handleSelectCompany(searchResults[0].id);
      } else {
        handleSearchAll(); // Otherwise, perform a general search
      }
    }
  };

  return (
    <section className="hero-section">
      
      <div className="hero-content">
        <h2>India’s Most Reliable Business Intelligence Platform</h2>
        <p>Unlock verified company data, market trends, and AI‑powered insights for smarter business decisions.</p>
        <div className="search-container" ref={searchContainerRef}>
          <input
            className="search-input"
            type="text"
            value={symbol}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Search for a company, ticker, CIN..."
            disabled={!user} // Disable search if not logged in
          />
          {searchError && <p className="error-message">{searchError}</p>}

          {showDropdown && searchResults.length > 0 && (
            <div className="search-results-dropdown">
              <ul>
                {searchResults.map((company) => (
                  <li key={company.id} onClick={() => handleSelectCompany(company.id)}>
                    <strong>{company.companyName}</strong> ({company.ticker || company.cin})
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="search-buttons-wrapper">
            <button className="search-button" onClick={() => handleSelectCompany(searchResults[0]?.id)} disabled={loadingSearch || searchResults.length === 0 || !user}>
              View Selected Company
            </button>
            <button className="search-button secondary" onClick={handleSearchAll} disabled={loadingSearch || !symbol.trim() || !user}>
              Search All
            </button>
          </div>
          {!user && (
            <p className="error-message">Please sign in to use the search functionality.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
