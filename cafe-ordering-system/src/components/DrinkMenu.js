import React, { useState } from 'react';
import { drinkNames, drinkPrices, sizeNames } from '../data/menuData';
import '../styles/components/DrinkMenu.css';

function DrinkMenu({ onAddToOrder }) {
  // State to track quantities for each drink+size combination
  // Structure: { "drinkIndex-sizeIndex": quantity }
  const [quantities, setQuantities] = useState({});

  // Handle adding a drink+size combination
  const handleAddSize = (drinkIndex, sizeIndex) => {
    const key = `${drinkIndex}-${sizeIndex}`;
    
    // Update the quantity for this specific drink+size
    setQuantities(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + 1
    }));

    // Notify parent component (App.js) about the selection
    // Pass the drink, size, and price to be added to order
    onAddToOrder({
      drinkIndex: drinkIndex,
      sizeIndex: sizeIndex,
      drinkName: drinkNames[drinkIndex],
      sizeName: sizeNames[sizeIndex],
      price: drinkPrices[drinkIndex][sizeIndex]
    });
  };

  // Get quantity for a specific drink+size
  const getQuantity = (drinkIndex, sizeIndex) => {
    const key = `${drinkIndex}-${sizeIndex}`;
    return quantities[key] || 0;
  };

  return (
    <div className="drink-menu">
      <h2 className="section-title">Select Your Drink</h2>
      
      <div className="menu-table-container">
        <table className="menu-table">
          {/* Table Header */}
          <thead>
            <tr>
              <th className="drink-name-header">Select Your Drink</th>
              <th className="size-header">Small <span className="price-sub">₱{drinkPrices[0][0]}</span></th>
              <th className="size-header">Regular <span className="price-sub">₱{drinkPrices[0][1]}</span></th>
              <th className="size-header">Large <span className="price-sub">₱{drinkPrices[0][2]}</span></th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {drinkNames.map((name, drinkIndex) => (
              <tr key={drinkIndex} className="drink-row">
                {/* Drink Name Column */}
                <td className="drink-name-cell">{name}</td>
                
                {/* Size Columns */}
                {[0, 1, 2].map((sizeIndex) => {
                  const price = drinkPrices[drinkIndex][sizeIndex];
                  const quantity = getQuantity(drinkIndex, sizeIndex);
                  const sizeLabel = sizeNames[sizeIndex];
                  
                  return (
                    <td key={sizeIndex} className="size-cell">
                      <div className="size-option">
                        <button
                          className={`add-btn ${quantity > 0 ? 'has-quantity' : ''}`}
                          onClick={() => handleAddSize(drinkIndex, sizeIndex)}
                          title={`Add ${sizeLabel} ${name}`}
                        >
                          +
                        </button>
                        {quantity > 0 && (
                          <span className="quantity-badge">{quantity}</span>
                        )}
                        <span className="size-price">₱{price}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Helpful tip */}
      <div className="menu-tip">
        💡 Click the <strong>+</strong> button to add a drink with a specific size to your order
      </div>
    </div>
  );
}

export default DrinkMenu;