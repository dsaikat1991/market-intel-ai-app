// src/pages/CompanyDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function CompanyDetails() {
  const { id } = useParams(); // grabs the :id from URL
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const docRef = doc(db, "companies", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCompany(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchCompany();
  }, [id]);

  if (!company) return <p>Loading company details...</p>;

  return (
    <div className="company-details" style={{ padding: "20px" }}>
      <h2>{company.name}</h2>
      <p><strong>CEO:</strong> {company.ceo}</p>
      <p><strong>Sector:</strong> {company.sector}</p>
      <p><strong>Headquarters:</strong> {company.headquarters}</p>
      <p><strong>Founded Year:</strong> {company.foundedYear}</p>
      <p><strong>Employees:</strong> {company.employees}</p>
      <p><strong>Revenue:</strong> {company.revenue}</p>
      <p><strong>Website:</strong> <a href={company.website} target="_blank" rel="noreferrer">{company.website}</a></p>
    </div>
  );
}

export default CompanyDetails;
