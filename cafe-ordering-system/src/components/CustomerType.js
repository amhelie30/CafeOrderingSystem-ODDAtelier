/**
 * CustomerType.js - Component for selecting customer type
 */

import React from 'react';
import { customerTypes, discounts } from '../data/menuData';
import '../styles/components/CustomerType.css';

function CustomerType({ selectedCustomer, onSelectCustomer }) {
  return (
    <div className="customer-type">
      <h2 className="section-title">Customer Type</h2>
      <div className="customer-options">
        {customerTypes.map((type, index) => (
          <button
            key={index}
            className={`customer-btn ${selectedCustomer === index ? 'selected' : ''}`}
            onClick={() => onSelectCustomer(index)}
          >
            <span className="customer-name">{type}</span>
            <span className="customer-discount">
              {discounts[index] * 100}% discount
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CustomerType;