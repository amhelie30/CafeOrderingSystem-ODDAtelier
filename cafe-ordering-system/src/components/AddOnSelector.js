/**
 * AddOnSelector.js - Component for selecting add-ons
 */

import React from 'react';
import { addOnNames, addOnPrices } from '../data/menuData';
import '../styles/components/AddOnSelector.css';

function AddOnSelector({ selectedAddOns, onToggleAddOn }) {
  return (
    <div className="addon-selector">
      <h2 className="section-title">Add-Ons (Optional)</h2>
      <p className="addon-instruction">Select any add-ons you want:</p>
      <div className="addon-grid">
        {addOnNames.map((name, index) => (
          <button
            key={index}
            className={`addon-btn ${selectedAddOns.includes(index) ? 'selected' : ''}`}
            onClick={() => onToggleAddOn(index)}
          >
            <span className="addon-name">{name}</span>
            <span className="addon-price">+₱{addOnPrices[index]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AddOnSelector;