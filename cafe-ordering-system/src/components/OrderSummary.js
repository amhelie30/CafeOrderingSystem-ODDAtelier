/**
 * OrderSummary.js - Shows current customer selection info
 */

import React from 'react';
import { customerTypes } from '../data/menuData';
import '../styles/components/OrderSummary.css';

function OrderSummary({ selectedCustomer }) {
  const customerType = customerTypes[selectedCustomer];

  return (
    <div className="order-summary">
      <h2 className="section-title">Current Selection</h2>
      <div className="summary-content">
        <div className="summary-item">
          <span className="item-label">Customer Type:</span>
          <span className="item-value">{customerType}</span>
        </div>
        <div className="empty-state" style={{ marginTop: '1rem' }}>
          <p>Click an order in "Customize Your Orders" to add extras</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;