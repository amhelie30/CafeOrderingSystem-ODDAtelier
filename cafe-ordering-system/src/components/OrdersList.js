/**
 * OrdersList.js - Component for displaying all placed orders
 */

import React from 'react';
import { formatCurrency } from '../utils/calculations';
import '../styles/components/OrdersList.css';

function OrdersList({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="orders-list">
        <h2 className="section-title">Your Orders</h2>
        <div className="empty-state">
          <p>No orders placed yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-list">
      <h2 className="section-title">All Orders</h2>
      <div className="orders-container">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <div className="order-number">#{index + 1}</div>
            <div className="order-details">
              <div className="order-main">
                <span className="order-drink">{order.drink}</span>
                <span className="order-size">({order.size})</span>
              </div>
              {order.addOns && order.addOns.length > 0 && (
                <div className="order-addons">
                  Add-ons: {order.addOns.join(', ')}
                </div>
              )}
              <div className="order-customer">
                Customer: {order.customerType}
              </div>
            </div>
            <div className="order-total">
              {formatCurrency(order.total)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersList;