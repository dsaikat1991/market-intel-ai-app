import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function CompanyForm() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert numeric fields to numbers
    const dataToSubmit = {
      ...formData,
      foundedYear: Number(formData.foundedYear),
      employees: Number(formData.employees),
    };

    try {
      await addDoc(collection(db, "companies"), dataToSubmit);
      alert("Company added successfully!");
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
      alert("Failed to add company.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h3>Add New Company</h3>

      <input
        type="text"
        name="name"
        placeholder="Company Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="ceo"
        placeholder="CEO"
        value={formData.ceo}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="sector"
        placeholder="Sector"
        value={formData.sector}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="headquarters"
        placeholder="Headquarters"
        value={formData.headquarters}
        onChange={handleChange}
        required
      />
      <input
        type="url"
        name="website"
        placeholder="Website"
        value={formData.website}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="revenue"
        placeholder="Revenue"
        value={formData.revenue}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="foundedYear"
        placeholder="Founded Year"
        value={formData.foundedYear}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="employees"
        placeholder="Number of Employees"
        value={formData.employees}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Company</button>
    </form>
  );
}

export default CompanyForm;
