/**
 * AddOnSelector.js - Displays all orders; clicking opens add-on popup
 * 
 * Features:
 * - Shows list of all individual orders
 * - Click an order → opens popup with add-on options
 * - Add-ons toggle on/off per order
 */

import React, { useState } from 'react';
import { addOnNames, addOnPrices } from '../data/menuData';
import '../styles/components/AddOnSelector.css';

function AddOnSelector({ orders, onToggleAddOnForOrder }) {
  // Which order is currently open in the popup
  const [activeOrderId, setActiveOrderId] = useState(null);

  // Find the active order object
  const activeOrder = orders.find(o => o.id === activeOrderId);

  // Open popup for an order
  const openPopup = (orderId) => {
    setActiveOrderId(orderId);
  };

  // Close popup
  const closePopup = () => {
    setActiveOrderId(null);
  };

  // Handle add-on click (toggle)
  const handleAddOnClick = (addOnIndex) => {
    if (activeOrderId !== null) {
      onToggleAddOnForOrder(activeOrderId, addOnIndex);
    }
  };

  // ===== EMPTY STATE =====
  if (orders.length === 0) {
    return (
      <div className="addon-selector">
        <h2 className="section-title">Customize Your Orders</h2>
        <div className="empty-state">
          <p>No orders yet — add a drink first to customize add-ons</p>
        </div>
      </div>
    );
  }

  return (
    <div className="addon-selector">
      <h2 className="section-title">Customize Your Orders</h2>
      <p className="addon-instruction">
        Click an order below to add or remove add-ons
      </p>

      {/* ===== ORDER LIST ===== */}
      <div className="order-click-list">
        {orders.map((order, index) => (
          <button
            key={order.id}
            className={`order-click-card ${
              order.addOns.length > 0 ? 'has-addons' : ''
            }`}
            onClick={() => openPopup(order.id)}
          >
            <div className="order-click-number">#{index + 1}</div>
            <div className="order-click-info">
              <div className="order-click-main">
                <span className="order-click-drink">{order.drink}</span>
                <span className="order-click-size">({order.size})</span>
              </div>
              <div className="order-click-addons">
                {order.addOns.length > 0
                  ? `Add-ons: ${order.addOns.join(', ')}`
                  : 'No add-ons yet'}
              </div>
            </div>
            <div className="order-click-arrow">›</div>
          </button>
        ))}
      </div>

      {/* ===== POPUP MODAL ===== */}
      {activeOrder && (
        <div className="addon-popup-overlay" onClick={closePopup}>
          <div
            className="addon-popup"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="addon-popup-header">
              <p className="addon-popup-instruction">Please choose your Add On</p>
              <h3 className="addon-popup-itemname">
                {activeOrder.drink} ({activeOrder.size})
              </h3>
            </div>

            {/* Add-ons Grid - 2 Rows */}
            <div className="addon-popup-grid">
              {/* Row 1: Whipped Cream (3), Oat Milk (2), Soy Milk (1) */}
              <button
                className={`addon-popup-btn ${
                  activeOrder.addOnIndices.includes(3) ? 'selected' : ''
                }`}
                onClick={() => handleAddOnClick(3)}
              >
                <span className="addon-popup-name">{addOnNames[3]}</span>
                <span className="addon-popup-price">+₱{addOnPrices[3]}</span>
              </button>

              <button
                className={`addon-popup-btn ${
                  activeOrder.addOnIndices.includes(2) ? 'selected' : ''
                }`}
                onClick={() => handleAddOnClick(2)}
              >
                <span className="addon-popup-name">{addOnNames[2]}</span>
                <span className="addon-popup-price">+₱{addOnPrices[2]}</span>
              </button>

              <button
                className={`addon-popup-btn ${
                  activeOrder.addOnIndices.includes(1) ? 'selected' : ''
                }`}
                onClick={() => handleAddOnClick(1)}
              >
                <span className="addon-popup-name">{addOnNames[1]}</span>
                <span className="addon-popup-price">+₱{addOnPrices[1]}</span>
              </button>

              {/* Row 2: Extra Espresso Shot (0), Caramel Syrup (4) */}
              <button
                className={`addon-popup-btn ${
                  activeOrder.addOnIndices.includes(0) ? 'selected' : ''
                }`}
                onClick={() => handleAddOnClick(0)}
              >
                <span className="addon-popup-name">{addOnNames[0]}</span>
                <span className="addon-popup-price">+₱{addOnPrices[0]}</span>
              </button>

              <button
                className={`addon-popup-btn ${
                  activeOrder.addOnIndices.includes(4) ? 'selected' : ''
                }`}
                onClick={() => handleAddOnClick(4)}
              >
                <span className="addon-popup-name">{addOnNames[4]}</span>
                <span className="addon-popup-price">+₱{addOnPrices[4]}</span>
              </button>
            </div>

            {/* Footer */}
            <div className="addon-popup-footer">
              <button className="addon-popup-done" onClick={closePopup}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddOnSelector;