// src/pages/SearchResultsPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { auth } from '../firebaseConfig'; // Import auth to get current user
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/App.css'; // General styles

function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Local user state for this page

  // Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate('/login'); // Redirect to login if not authenticated
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!user || !searchQuery) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setResults([]);

      try {
        const companiesRef = collection(db, "companies");
        let q;

        // Perform multiple queries for broader search
        // Query by companyName (exact match for now, could be improved with client-side filtering or more complex Firestore queries)
        q = query(companiesRef, where("companyName", "==", searchQuery));
        let snapshotByName = await getDocs(q);

        // Query by ticker
        q = query(companiesRef, where("ticker", "==", searchQuery));
        let snapshotByTicker = await getDocs(q);

        // Query by CIN
        q = query(companiesRef, where("cin", "==", searchQuery));
        let snapshotByCin = await getDocs(q);

        // Combine results and remove duplicates
        const combinedResults = [
          ...snapshotByName.docs.map(doc => ({ id: doc.id, ...doc.data() })),
          ...snapshotByTicker.docs.map(doc => ({ id: doc.id, ...doc.data() })),
          ...snapshotByCin.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        ];

        // Remove duplicates based on company ID
        const uniqueResults = Array.from(new Map(combinedResults.map(item => [item.id, item])).values());

        if (uniqueResults.length > 0) {
          setResults(uniqueResults);
        } else {
          setError(`No results found for "${searchQuery}".`);
        }
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, user]); // Re-run search when query or user changes

  if (!user) {
    return (
      <section className="generic-page-placeholder">
        <h2>Access Denied</h2>
        <p>Please sign in to view search results.</p>
        <button className="sign-in-button" onClick={() => navigate('/login')}>Sign In Now</button>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="generic-page-placeholder">
        <p className="loading-message">Searching for "{searchQuery}"...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="generic-page-placeholder">
        <p className="error-message">{error}</p>
        <button className="sign-in-button" onClick={() => navigate('/')}>Go to Home</button>
      </section>
    );
  }

  return (
    <section className="data-display-section">
      <div className="data-container">
        <h2>Search Results for "{searchQuery}"</h2>
        {results.length > 0 ? (
          <ul className="search-results-list">
            {results.map(company => (
              <li key={company.id} className="search-result-item" onClick={() => navigate(`/company/${company.id}`)}>
                <h3>{company.companyName}</h3>
                <p><strong>Ticker:</strong> {company.ticker || 'N/A'}</p>
                <p><strong>CIN:</strong> {company.cin || 'N/A'}</p>
                <p><strong>Industry:</strong> {company.industrySector || 'N/A'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-data-message">No companies found matching "{searchQuery}".</p>
        )}
      </div>
    </section>
  );
}

export default SearchResultsPage;
