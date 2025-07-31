// src/pages/AdminPage.js
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import CompanyForm from "../components/CompanyForm";

function AdminPage() {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    const querySnapshot = await getDocs(collection(db, "companies"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCompanies(data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this company?");
    if (!confirm) return;

    await deleteDoc(doc(db, "companies", id));
    fetchCompanies(); // Refresh list
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <CompanyForm onSuccess={fetchCompanies} />
      <h3>All Companies</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sector</th>
            <th>Revenue</th>
            <th>Founded</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.sector}</td>
              <td>{company.revenue}</td>
              <td>{company.foundedYear}</td>
              <td>
                <button>Edit</button>{" "}
                <button onClick={() => handleDelete(company.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
