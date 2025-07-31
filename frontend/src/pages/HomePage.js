import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import PricingSection from '../components/PricingSection';
import CompanyList from '../components/CompanyList'; // Add this line

function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CompanyList /> {/* Show company data here */}
    </>
  );
}

export default HomePage;
