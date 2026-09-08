/**
 * App.js - Main component that orchestrates the entire cafe ordering system
 * This component manages state and coordinates all child components
 * 
 * State Management:
 * - selectedDrink: Index of selected drink (null if none)
 * - selectedSize: Index of selected size (null if none)
 * - selectedCustomer: Index of selected customer type (0-3)
 * - selectedAddOns: Array of selected add-on indices
 * - orders: Array of all placed orders
 * - grandTotal: Cumulative total of all orders
 * - showSuccess: Boolean to show success message
 */

import React, { useState } from 'react';
import './App.css';

// Import components
import DrinkMenu from './components/DrinkMenu';
import SizeSelector from './components/SizeSelector';
import CustomerType from './components/CustomerType';
import AddOnSelector from './components/AddOnSelector';
import OrderSummary from './components/OrderSummary';
import OrdersList from './components/OrdersList';
import GrandTotal from './components/GrandTotal';

// Import data and utilities
import { drinkPrices, addOnPrices, customerTypes, drinkNames, sizeNames, addOnNames } from './data/menuData';
import { calculateOrderTotal, isValidOrder } from './utils/calculations';

function App() {
  // === STATE MANAGEMENT ===
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(0); // Default: Regular
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [orders, setOrders] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // === EVENT HANDLERS ===
  const handleSelectDrink = (index) => {
    setSelectedDrink(index);
    setShowSuccess(false);
  };

  const handleSelectSize = (index) => {
    setSelectedSize(index);
    setShowSuccess(false);
  };

  const handleSelectCustomer = (index) => {
    setSelectedCustomer(index);
    setShowSuccess(false);
  };

  const handleToggleAddOn = (index) => {
    setSelectedAddOns(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
    setShowSuccess(false);
  };

  /**
   * handlePlaceOrder - Places the current order
   * This function mirrors the logic from your Java console application
   */
  const handlePlaceOrder = () => {
    // Validate that a drink and size are selected
    if (!isValidOrder(selectedDrink, selectedSize)) {
      alert('Please select a drink and size first!');
      return;
    }

    // Calculate the order total
    const totals = calculateOrderTotal(
      selectedDrink,
      selectedSize,
      selectedAddOns,
      drinkPrices,
      addOnPrices,
      selectedCustomer
    );

    // Create order object
    const newOrder = {
      drink: drinkNames[selectedDrink],
      size: sizeNames[selectedSize],
      customerType: customerTypes[selectedCustomer],
      addOns: selectedAddOns.map(index => addOnNames[index]),
      total: totals.total
    };

    // Update orders list and grand total
    setOrders(prev => [...prev, newOrder]);
    setGrandTotal(prev => prev + totals.total);
    setShowSuccess(true);

    // Reset selections (except customer type)
    setSelectedDrink(null);
    setSelectedSize(null);
    setSelectedAddOns([]);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all orders?')) {
      setOrders([]);
      setGrandTotal(0);
      setSelectedDrink(null);
      setSelectedSize(null);
      setSelectedAddOns([]);
      setSelectedCustomer(0);
      setShowSuccess(false);
    }
  };

  // === RENDER ===
  return (
    <div className="app">
      <header className="app-header">
        <h1>☕ The ODD Atelier</h1>
        <p className="subtitle">Order your favorite drinks with custom add-ons</p>
      </header>

      <div className="main-content">
        {/* LEFT PANEL: Selection Area */}
        <div className="left-panel">
          <DrinkMenu 
            selectedDrink={selectedDrink} 
            onSelectDrink={handleSelectDrink} 
          />
          
          <SizeSelector 
            selectedSize={selectedSize} 
            onSelectSize={handleSelectSize} 
          />
          
          <CustomerType 
            selectedCustomer={selectedCustomer} 
            onSelectCustomer={handleSelectCustomer} 
          />
          
          <AddOnSelector 
            selectedAddOns={selectedAddOns} 
            onToggleAddOn={handleToggleAddOn} 
          />

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              className="place-order-btn" 
              onClick={handlePlaceOrder}
              disabled={!isValidOrder(selectedDrink, selectedSize)}
            >
              🛒 Place Order
            </button>
            <button 
              className="reset-btn" 
              onClick={handleReset}
            >
              🔄 Reset All
            </button>
          </div>

          {showSuccess && (
            <div className="success-message">
              ✅ Order placed successfully!
            </div>
          )}
        </div>

        {/* RIGHT PANEL: Summary Area */}
        <div className="right-panel">
          <OrderSummary 
            selectedDrink={selectedDrink}
            selectedSize={selectedSize}
            selectedAddOns={selectedAddOns}
            selectedCustomer={selectedCustomer}
            drinkPrices={drinkPrices}
            addOnPrices={addOnPrices}
          />

          <OrdersList orders={orders} />

          <GrandTotal 
            grandTotal={grandTotal} 
            orderCount={orders.length} 
          />
        </div>
      </div>

      <footer className="app-footer">
        <p>Made with ❤️ | Cafe Ordering System</p>
      </footer>
    </div>
  );
}

export default App;