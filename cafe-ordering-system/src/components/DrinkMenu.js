/**
 * DrinkMenu.js - Component for displaying and selecting drinks
 */

import React from 'react';
import { drinkNames, drinkPrices } from '../data/menuData';
import '../styles/components/DrinkMenu.css';

function DrinkMenu({ selectedDrink, onSelectDrink }) {
  return (
    <div className="drink-menu">
      <h2 className="section-title">Select Your Drink</h2>
      <div className="drink-grid">
        {drinkNames.map((name, index) => (
          <button
            key={index}
            className={`drink-card ${selectedDrink === index ? 'selected' : ''}`}
            onClick={() => onSelectDrink(index)}
          >
            <div className="drink-name">{name}</div>
            <div className="drink-prices">
              <span className="price-tag">Small: ₱{drinkPrices[index][0]}</span>
              <span className="price-tag">Regular: ₱{drinkPrices[index][1]}</span>
              <span className="price-tag">Large: ₱{drinkPrices[index][2]}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default DrinkMenu;