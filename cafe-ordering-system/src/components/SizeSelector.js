/**
 * SizeSelector.js - Component for selecting drink size
 */

import React from 'react';
import { sizeNames } from '../data/menuData';
import '../styles/components/SizeSelector.css';

function SizeSelector({ selectedSize, onSelectSize }) {
  return (
    <div className="size-selector">
      <h2 className="section-title">Select Size</h2>
      <div className="size-options">
        {sizeNames.map((name, index) => (
          <button
            key={index}
            className={`size-btn ${selectedSize === index ? 'selected' : ''}`}
            onClick={() => onSelectSize(index)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SizeSelector;