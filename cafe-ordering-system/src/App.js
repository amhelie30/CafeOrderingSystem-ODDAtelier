/**
 * App.js - Main component that orchestrates the entire cafe ordering system
 * Updated to work with the new table-based drink menu
 */

import React, { useState } from 'react';
import './App.css';

// Import components
import DrinkMenu from './components/DrinkMenu';
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
  const [selectedCustomer, setSelectedCustomer] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [orders, setOrders] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // === NEW: Handle adding a drink+size to order ===
  const handleAddToOrder = ({ drinkIndex, sizeIndex, drinkName, sizeName, price }) => {
    // Set the current selection for the order summary
    setSelectedDrink(drinkIndex);
    setSelectedSize(sizeIndex);
    
    // Automatically place the order after a brief delay
    // This creates a smooth experience where clicking "+" adds to cart
    setTimeout(() => {
      // Check if a customer type is selected
      const totals = calculateOrderTotal(
        drinkIndex,
        sizeIndex,
        selectedAddOns,
        drinkPrices,
        addOnPrices,
        selectedCustomer
      );

      const newOrder = {
        drink: drinkName,
        size: sizeName,
        customerType: customerTypes[selectedCustomer],
        addOns: selectedAddOns.map(index => addOnNames[index]),
        total: totals.total
      };

      setOrders(prev => [...prev, newOrder]);
      setGrandTotal(prev => prev + totals.total);
      setShowSuccess(true);

      // Reset selections (but keep customer type)
      setSelectedDrink(null);
      setSelectedSize(null);
      setSelectedAddOns([]);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }, 100);
  };

  // === EVENT HANDLERS ===
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
        <h1>☕ Brew Haven Cafe</h1>
        <p className="subtitle">Order your favorite drinks with custom add-ons</p>
      </header>

      <div className="main-content">
        {/* LEFT PANEL: Selection Area */}
        <div className="left-panel">
          {/* NEW: DrinkMenu with integrated size selection */}
          <DrinkMenu onAddToOrder={handleAddToOrder} />
          
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
              className="reset-btn" 
              onClick={handleReset}
            >
              🔄 Reset All Orders
            </button>
          </div>

          {showSuccess && (
            <div className="success-message">
              ✅ Item added to your order!
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
        <p>Made with ❤️ | Brew Haven Cafe</p>
      </footer>
    </div>
  );
}

export default App;