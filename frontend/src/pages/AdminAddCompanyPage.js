// src/pages/AdminAddCompanyPage.js
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./AdminAddCompanyPage.css";

function AdminAddCompanyPage() {
  const [formData, setFormData] = useState({
    name: "",
    ceo: "",
    sector: "",
    headquarters: "",
    website: "",
    revenue: "",
    foundedYear: "",
    employees: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSave = {
        ...formData,
        foundedYear: Number(formData.foundedYear),
        employees: Number(formData.employees),
      };

      await addDoc(collection(db, "companies"), dataToSave);
      setSuccess(true);
      setFormData({
        name: "",
        ceo: "",
        sector: "",
        headquarters: "",
        website: "",
        revenue: "",
        foundedYear: "",
        employees: "",
      });
    } catch (error) {
      console.error("Error adding company:", error);
      setSuccess(false);
    }
  };

  return (
    <div className="admin-add-company">
      <h2>Add New Company</h2>
      <form onSubmit={handleSubmit} className="company-form">
        {Object.entries(formData).map(([key, value]) => (
          <input
            key={key}
            type={["foundedYear", "employees"].includes(key) ? "number" : "text"}
            name={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={value}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit">Add Company</button>
      </form>
      {success && <p className="success-msg">Company added successfully!</p>}
    </div>
  );
}

export default AdminAddCompanyPage;
