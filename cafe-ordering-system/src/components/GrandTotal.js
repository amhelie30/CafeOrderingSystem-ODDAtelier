/**
 * GrandTotal.js - Component for displaying the grand total of all orders
 */

import React from 'react';
import { formatCurrency } from '../utils/calculations';
import '../styles/components/GrandTotal.css';

function GrandTotal({ grandTotal, orderCount }) {
  if (orderCount === 0) {
    return (
      <div className="grand-total">
        <div className="total-amount">Grand Total: ₱0.00</div>
        <div className="order-count">0 orders placed</div>
      </div>
    );
  }

  return (
    <div className="grand-total">
      <div className="total-amount">
        <span className="total-label">Grand Total:</span>
        <span className="total-value">{formatCurrency(grandTotal)}</span>
      </div>
      <div className="order-count">
        {orderCount} {orderCount === 1 ? 'order' : 'orders'} placed
      </div>
    </div>
  );
}

export default GrandTotal;