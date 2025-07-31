// src/components/CompanyList.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./CompanyList.css"; // Optional: for styling
import { Link } from "react-router-dom";

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "companies"));
        const companyData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompanies(companyData);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="company-list">
      <h2>All Companies</h2>
      {companies.map((company) => (
        <div key={company.id} className="company-card">
          <h3>
          <Link to={`/company/${company.id}`}>{company.name}</Link>
          </h3>
          <p><strong>CEO:</strong> {company.ceo}</p>
          <p><strong>Sector:</strong> {company.sector}</p>
          <p><strong>Headquarters:</strong> {company.headquarters}</p>
          <p><strong>Founded Year:</strong> {company.foundedYear}</p>
          <p><strong>Employees:</strong> {company.employees}</p>
          <p><strong>Revenue:</strong> {company.revenue}</p>
          <p><strong>Website:</strong> <a href={company.website} target="_blank" rel="noreferrer">{company.website}</a></p>
        </div>
      ))}
    </div>
  );
}

export default CompanyList;
