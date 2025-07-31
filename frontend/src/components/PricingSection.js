import React from 'react';
import './PricingSection.css';

const plans = [
  {
    name: 'Freemium',
    price: '₹0',
    description: 'Great for trying out the platform.',
    features: ['Basic Search', '5 Companies/Day', 'Limited Details'],
    button: 'Start Free',
  },
  {
    name: 'Premium',
    price: '₹499/mo',
    description: 'For professionals who need detailed insights.',
    features: ['Unlimited Search', 'Reports Download', 'Chart Access'],
    button: 'Upgrade Now',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Ideal for businesses and teams.',
    features: ['Team Accounts', 'Custom API Access', 'Priority Support'],
    button: 'Contact Sales',
  }
];

const PricingSection = () => {
  return (
    <div className="pricing-section">
      <h2>Flexible Pricing for Every Need</h2>
      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <div key={index} className="pricing-card">
            <h3>{plan.name}</h3>
            <p className="price">{plan.price}</p>
            <p>{plan.description}</p>
            <ul>
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button>{plan.button}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
