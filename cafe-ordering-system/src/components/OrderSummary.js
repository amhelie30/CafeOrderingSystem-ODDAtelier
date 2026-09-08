/**
 * OrderSummary.js - Component for displaying current order details
 */

import React from 'react';
import { drinkNames, sizeNames, addOnNames, customerTypes } from '../data/menuData';
import { formatCurrency, calculateOrderTotal } from '../utils/calculations';
import '../styles/components/OrderSummary.css';

function OrderSummary({
  selectedDrink,
  selectedSize,
  selectedAddOns,
  selectedCustomer,
  drinkPrices,
  addOnPrices
}) {
  const totals = calculateOrderTotal(
    selectedDrink,
    selectedSize,
    selectedAddOns,
    drinkPrices,
    addOnPrices,
    selectedCustomer
  );

  const hasSelection = selectedDrink !== null && selectedSize !== null;

  if (!hasSelection) {
    return (
      <div className="order-summary">
        <h2 className="section-title">Order Summary</h2>
        <div className="empty-state">
          <p>Please select a drink and size to see your order summary</p>
        </div>
      </div>
    );
  }

  const drinkName = drinkNames[selectedDrink];
  const sizeName = sizeNames[selectedSize];
  const customerType = customerTypes[selectedCustomer];

  return (
    <div className="order-summary">
      <h2 className="section-title">Order Summary</h2>
      
      <div className="summary-content">
        <div className="summary-item">
          <span className="item-label">Drink:</span>
          <span className="item-value">{drinkName}</span>
        </div>
        
        <div className="summary-item">
          <span className="item-label">Size:</span>
          <span className="item-value">{sizeName}</span>
        </div>
        
        <div className="summary-item">
          <span className="item-label">Customer Type:</span>
          <span className="item-value">{customerType}</span>
        </div>
        
        {selectedAddOns.length > 0 && (
          <div className="summary-item addons-section">
            <span className="item-label">Add-ons:</span>
            <span className="item-value">
              {selectedAddOns.map(index => addOnNames[index]).join(', ')}
            </span>
          </div>
        )}
        
        <div className="price-breakdown">
          <div className="price-row">
            <span>Drink Price:</span>
            <span>{formatCurrency(totals.drinkPrice)}</span>
          </div>
          
          {totals.addOnsTotal > 0 && (
            <div className="price-row">
              <span>Add-ons Total:</span>
              <span>{formatCurrency(totals.addOnsTotal)}</span>
            </div>
          )}
          
          <div className="price-row">
            <span>Subtotal:</span>
            <span>{formatCurrency(totals.subtotal)}</span>
          </div>
          
          {totals.discountAmount > 0 && (
            <div className="price-row discount">
              <span>Discount ({customerType}):</span>
              <span>-{formatCurrency(totals.discountAmount)}</span>
            </div>
          )}
          
          <div className="price-row total">
            <span><strong>Total:</strong></span>
            <span><strong>{formatCurrency(totals.total)}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;