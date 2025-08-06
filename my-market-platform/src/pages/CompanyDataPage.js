// src/pages/CompanyDataPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { auth } from '../firebaseConfig'; // Import auth to get current user
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/App.css'; // General styles

function CompanyDataPage() {
  const { companyId } = useParams(); // Get companyId from URL parameters
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null); // Local user state for this page

  // Effect to listen for authentication state changes and fetch user role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserRole(userDocSnap.data().role);
        } else {
          setUserRole('freemium'); // Default for new users
        }
      } else {
        setUserRole(null);
        // If no user, redirect to login or home
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);


  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (!user || !userRole) {
        // Wait for user and userRole to be loaded before fetching data
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const companyDocRef = doc(db, "companies", companyId);
        const companyDocSnap = await getDoc(companyDocRef);

        if (companyDocSnap.exists()) {
          setCompanyData(companyDocSnap.data());
        } else {
          setError("Company not found.");
          setCompanyData(null);
        }
      } catch (err) {
        console.error("Error fetching company details:", err);
        setError("Failed to load company details. Please try again.");
        setCompanyData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [companyId, user, userRole]); // Re-fetch when companyId, user, or userRole changes

  const formatCurrency = (num) => {
    if (num === undefined || num === null) return 'N/A';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    // Firestore Timestamps have to be converted to JS Date objects
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <section className="data-display-section">
        <p className="loading-message">Loading company data...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="data-display-section">
        <p className="error-message">{error}</p>
        <button className="sign-in-button" onClick={() => navigate('/')}>Go to Home</button>
      </section>
    );
  }

  if (!companyData) {
    return (
      <section className="data-display-section">
        <p className="no-data-message">No company data available.</p>
        <button className="sign-in-button" onClick={() => navigate('/')}>Go to Home</button>
      </section>
    );
  }

  return (
    <section className="data-display-section">
      <div className="data-container">
        <h2 className="company-name">{companyData.companyName} {companyData.ticker ? `(${companyData.ticker})` : ''}</h2>
        <p><strong>CIN:</strong> {companyData.cin || 'N/A'}</p>
        <p><strong>Status:</strong> {companyData.status}</p>
        <p><strong>Incorporation Date:</strong> {formatDate(companyData.incorporationDate)}</p>
        <p><strong>Industry Sector:</strong> {companyData.industrySector}</p>
        <p><strong>Registered Address:</strong> {companyData.registeredAddress}</p>
        <p><strong>Email:</strong> {companyData.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {companyData.phone || 'N/A'} </p>
        <p><strong>Website:</strong> <a href={companyData.website} target="_blank" rel="noopener noreferrer">{companyData.website || 'N/A'}</a></p>
        <p><strong>Authorized Capital:</strong> {formatCurrency(companyData.authorizedCapital)}</p>
        <p><strong>Paid-up Capital:</strong> {formatCurrency(companyData.paidUpCapital)}</p>
        <p><strong>Last Annual Filing:</strong> {formatDate(companyData.lastAnnualFilingDate)}</p>
        <p><strong>Last Balance Sheet:</strong> {formatDate(companyData.lastBalanceSheetDate)}</p>

        <h3>Directors</h3>
        {companyData.directors && companyData.directors.length > 0 ? (
          <ul className="directors-list">
            {companyData.directors.map((director, index) => (
                <li key={index}>
                  <strong>{director.name}</strong> ({director.designation}) - DIN: {director.din || 'N/A'}
                </li>
              ))}
            </ul>
          ) : (
            <p>No director information available.</p>
          )}

          {(userRole === 'premium' || userRole === 'enterprise' || userRole === 'admin') && (
            <>
              <h3>Key Financials (Annual)</h3>
              {companyData.keyFinancials?.annual && companyData.keyFinancials.annual.length > 0 ? (
                <div className="financials-table-container">
                  <table className="financials-table">
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th>Revenue</th>
                        <th>Net Profit</th>
                        <th>EBITDA</th>
                        <th>Total Assets</th>
                        <th>Total Liabilities</th>
                        <th>Equity</th>
                        <th>Operating Cash Flow</th>
                        <th>Debt/Equity</th>
                        <th>ROE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companyData.keyFinancials.annual.map((fin, index) => (
                        <tr key={index}>
                          <td>{fin.year}</td>
                          <td>{formatCurrency(fin.revenue)}</td>
                          <td>{formatCurrency(fin.netProfit)}</td>
                          <td>{formatCurrency(fin.ebitda)}</td>
                          <td>{formatCurrency(fin.totalAssets)}</td>
                          <td>{formatCurrency(fin.totalLiabilities)}</td>
                          <td>{formatCurrency(fin.shareholderEquity)}</td>
                          <td>{formatCurrency(fin.cashFlowFromOperations)}</td>
                          <td>{fin.debtToEquityRatio?.toFixed(2) || 'N/A'}</td>
                          <td>{(fin.roe * 100)?.toFixed(2) || 'N/A'}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No annual financial data available.</p>
              )}

              <h3>Key Financials (Quarterly)</h3>
              {companyData.keyFinancials?.quarterly && companyData.keyFinancials.quarterly.length > 0 ? (
                <div className="financials-table-container">
                  <table className="financials-table">
                    <thead>
                      <tr>
                        <th>Quarter</th>
                        <th>Revenue</th>
                        <th>Net Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companyData.keyFinancials.quarterly.map((fin, index) => (
                        <tr key={index}>
                          <td>{fin.quarter}</td>
                          <td>{formatCurrency(fin.revenue)}</td>
                          <td>{formatCurrency(fin.netProfit)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No quarterly financial data available.</p>
              )}

              <h3>Latest Ratios</h3>
              {companyData.keyFinancials?.ratios ? (
                <ul className="ratios-list">
                  <li><strong>P/E Ratio:</strong> {companyData.keyFinancials.ratios.peRatio?.toFixed(2) || 'N/A'}</li>
                  <li><strong>Debt to Equity:</strong> {companyData.keyFinancials.ratios.debtToEquity?.toFixed(2) || 'N/A'}</li>
                  <li><strong>Current Ratio:</strong> {companyData.keyFinancials.ratios.currentRatio?.toFixed(2) || 'N/A'}</li>
                  <li><strong>ROE:</strong> {(companyData.keyFinancials.ratios.roe * 100)?.toFixed(2) || 'N/A'}%</li>
                  <li><strong>ROCE:</strong> {(companyData.keyFinancials.ratios.roce * 100)?.toFixed(2) || 'N/A'}%</li>
                </ul>
              ) : (
                <p>No latest ratio data available.</p>
              )}

              <h3>Recent News</h3>
              {companyData.news && companyData.news.length > 0 ? (
                <div className="news-list">
                  {companyData.news.map((item, index) => (
                    <div key={index} className="news-item">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.headline}
                      </a>
                      <p>{item.summary}</p>
                      <span className="news-date">{formatDate(item.date)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No recent news available.</p>
              )}
            </>
          )}

          {(userRole === 'enterprise' || userRole === 'admin') && (
            <div className="enterprise-features">
              <h3>Funding Rounds</h3>
              {companyData.fundingRounds && companyData.fundingRounds.length > 0 ? (
                <ul className="funding-list">
                  {companyData.fundingRounds.map((round, index) => (
                    <li key={index}>
                      <strong>{formatDate(round.date)}:</strong> {formatCurrency(round.amount)} - {round.roundType} by {round.investor}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No funding round data available.</p>
              )}

              <h3>Mergers & Acquisitions</h3>
              {companyData.mergersAndAcquisitions && companyData.mergersAndAcquisitions.length > 0 ? (
                <ul className="mna-list">
                  {companyData.mergersAndAcquisitions.map((mna, index) => (
                    <li key={index}>
                      <strong>{formatDate(mna.date)}:</strong> {mna.type} of {mna.targetCompany} {mna.dealValue ? `for ${formatCurrency(mna.dealValue)}` : ''}. {mna.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No M&A data available.</p>
              )}

              <h3>Investments Made</h3>
              {companyData.investmentsMade && companyData.investmentsMade.length > 0 ? (
                <ul className="investments-list">
                  {companyData.investmentsMade.map((inv, index) => (
                    <li key={index}>
                      <strong>{formatDate(inv.date)}:</strong> Invested {formatCurrency(inv.amount)} in {inv.investeeCompany} ({inv.roundType || 'N/A'} Round). {inv.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No investment data available.</p>
              )}

              <h3>Competitors</h3>
              {companyData.competitors && companyData.competitors.length > 0 ? (
                <ul className="competitors-list">
                  {companyData.competitors.map((comp, index) => (
                    <li key={index}>{comp}</li>
                  ))}
                </ul>
              ) : (
                <p>No competitor data available.</p>
              )}

              <h3>Risk Factors</h3>
              {companyData.riskFactors && companyData.riskFactors.length > 0 ? (
                <ul className="risk-factors-list">
                  {companyData.riskFactors.map((risk, index) => (
                    <li key={index}>{risk}</li>
                  ))}
                </ul>
              ) : (
                <p>No risk factors available.</p>
              )}

              <h3>Compliance History</h3>
              {companyData.complianceHistory && companyData.complianceHistory.length > 0 ? (
                <ul className="compliance-list">
                  {companyData.complianceHistory.map((comp, index) => (
                    <li key={index}>
                      <strong>{formatDate(comp.filingDate)}:</strong> {comp.formType} - {comp.status}. Details: {comp.details}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No compliance history available.</p>
              )}
            </div>
          )}

          {userRole === 'freemium' && (
            <div className="access-message">
              <p>Upgrade to Premium to view Financials and Press Releases!</p>
            </div>
          )}
          {(userRole === 'premium' && companyData) && (
            <div className="access-message">
              <p>Upgrade to Enterprise to view Funding Rounds, M&A, Investments, Competitors, Risk Factors, and Compliance History!</p>
            </div>
          )}
        </div>
      </section>
     
  );
}

export default CompanyDataPage;
