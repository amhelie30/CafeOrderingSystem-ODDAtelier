/**
 * OrdersList.js - Shows all orders with delete + undo functionality
 * Simplified: no strikethrough, matching button style
 */

import React from 'react';
import { formatCurrency } from '../utils/calculations';
import '../styles/components/OrdersList.css';

function OrdersList({ 
  orders, 
  deletedOrders, 
  onMarkDeleted, 
  onUndoDelete,
  onPermanentDelete 
}) {
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
        {orders.map((order, index) => {
          const isDeleted = deletedOrders.has(order.id);
          
          return (
            <div 
              key={order.id || index} 
              className={`order-item ${isDeleted ? 'deleted' : ''}`}
            >
              <div className="order-number">#{index + 1}</div>
              
              <div className="order-details">
                <div className="order-main">
                  <span className="order-drink">{order.drink}</span>
                  <span className="order-size">({order.size})</span>
                  {isDeleted && (
                    <span className="deleted-badge">Deleted</span>
                  )}
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

              {/* ✅ Delete / Undo Buttons */}
              <div className="order-actions">
                {isDeleted ? (
                  <>
                    <button
                      className="undo-btn"
                      onClick={() => onUndoDelete(order.id)}
                      title="Undo delete"
                    >
                      ↩ Undo
                    </button>
                    <button
                      className="permanent-delete-btn"
                      onClick={() => onPermanentDelete(order.id)}
                      title="Remove permanently"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <button
                    className="delete-btn"
                    onClick={() => onMarkDeleted(order.id)}
                    title="Delete order"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrdersList;