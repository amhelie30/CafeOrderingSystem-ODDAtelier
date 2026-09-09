/**
 * DrinkMenu.js - Component for displaying drinks in a table format
 * Complete working version with proper add/remove functionality
 */

import React, { useState } from 'react';
import { drinkNames, drinkPrices, sizeNames } from '../data/menuData';
import '../styles/components/DrinkMenu.css';

function DrinkMenu({ onAddToOrder, onRemoveFromOrder }) {
  // Track quantities for each drink+size combination
  const [quantities, setQuantities] = useState({});

  // Handle adding a drink+size combination
  const handleAddSize = (drinkIndex, sizeIndex) => {
    const key = `${drinkIndex}-${sizeIndex}`;
    
    setQuantities(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + 1
    }));

    // Notify parent to add to order
    onAddToOrder({
      drinkIndex: drinkIndex,
      sizeIndex: sizeIndex,
      drinkName: drinkNames[drinkIndex],
      sizeName: sizeNames[sizeIndex],
      price: drinkPrices[drinkIndex][sizeIndex]
    });
  };

  // Handle canceling (removing all) a drink+size combination
  const handleCancelOrder = (drinkIndex, sizeIndex) => {
    const key = `${drinkIndex}-${sizeIndex}`;
    const currentQty = quantities[key] || 0;
    
    if (currentQty > 0) {
      setQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[key];
        return newQuantities;
      });

      // Notify parent to remove ALL orders with this drink+size
      onRemoveFromOrder({
        drinkIndex: drinkIndex,
        sizeIndex: sizeIndex,
        drinkName: drinkNames[drinkIndex],
        sizeName: sizeNames[sizeIndex],
        price: drinkPrices[drinkIndex][sizeIndex],
        removeAll: true
      });
    }
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
          <thead>
            <tr>
              <th className="drink-name-header">Select Your Drink</th>
              <th className="size-header">Small <span className="price-sub">₱{drinkPrices[0][0]}</span></th>
              <th className="size-header">Regular <span className="price-sub">₱{drinkPrices[0][1]}</span></th>
              <th className="size-header">Large <span className="price-sub">₱{drinkPrices[0][2]}</span></th>
            </tr>
          </thead>
          
          <tbody>
            {drinkNames.map((name, drinkIndex) => (
              <tr key={drinkIndex} className="drink-row">
                <td className="drink-name-cell">{name}</td>
                
                {[0, 1, 2].map((sizeIndex) => {
                  const price = drinkPrices[drinkIndex][sizeIndex];
                  const quantity = getQuantity(drinkIndex, sizeIndex);
                  const sizeLabel = sizeNames[sizeIndex];
                  
                  return (
                    <td key={sizeIndex} className="size-cell">
                      <div className="size-option">
                        {/* "+" BUTTON */}
                        <button
                          className="add-btn"
                          onClick={() => handleAddSize(drinkIndex, sizeIndex)}
                          title={`Add ${sizeLabel} ${name}`}
                        >
                          +
                        </button>
                        
                        {/* PRICE */}
                        <span className="size-price">₱{price}</span>
                        
                        {/* BADGE WITH "✕" - Only shows when quantity > 0 */}
                        {quantity > 0 && (
                          <div className="badge-wrapper">
                            <span className="quantity-badge">{quantity}</span>
                            <button
                              className="badge-cancel-btn"
                              onClick={() => handleCancelOrder(drinkIndex, sizeIndex)}
                              title={`Cancel all ${sizeLabel} ${name} orders`}
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="menu-tip">
        💡 Click <strong>+</strong> to add, click the <strong>✕</strong> on the badge to cancel all orders for that size
      </div>
    </div>
  );
}

export default DrinkMenu;