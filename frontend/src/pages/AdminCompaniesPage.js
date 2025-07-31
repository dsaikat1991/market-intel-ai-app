// src/pages/AdminCompaniesPage.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import "./AdminCompaniesPage.css";

function AdminCompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCompanies = async () => {
    const q = query(collection(db, "companies"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCompanies(data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      await deleteDoc(doc(db, "companies", id));
      fetchCompanies(); // Refresh list
    }
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-companies-page">
      <h2>All Companies</h2>

      <input
        type="text"
        placeholder="Search companies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="company-list">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="company-card">
            <h4>{company.name}</h4>
            <p>CEO: {company.ceo}</p>
            <p>Sector: {company.sector}</p>
            <p>Founded: {company.foundedYear}</p>
            <p>Employees: {company.employees}</p>
            <div className="card-buttons">
              {/* Placeholder for edit functionality */}
              <Link to={`/admin/edit/${company.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(company.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCompaniesPage;
