/**
 * App.js - Main component with complete order management
 */

import React, { useState } from 'react';
import './App.css';

import DrinkMenu from './components/DrinkMenu';
import CustomerType from './components/CustomerType';
import AddOnSelector from './components/AddOnSelector';
import OrderSummary from './components/OrderSummary';
import OrdersList from './components/OrdersList';
import GrandTotal from './components/GrandTotal';

import { drinkPrices, addOnPrices, customerTypes, drinkNames, sizeNames, addOnNames } from './data/menuData';
import { calculateOrderTotal } from './utils/calculations';

function App() {
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // ===== HELPER: Calculate Grand Total from Orders =====
  const calculateGrandTotal = (orderList) => {
    return orderList.reduce((sum, order) => sum + order.total, 0);
  };

  // ===== HANDLE ADD TO ORDER =====
  const handleAddToOrder = ({ drinkIndex, sizeIndex, drinkName, sizeName, price }) => {
    setSelectedDrink(drinkIndex);
    setSelectedSize(sizeIndex);
    
    const totals = calculateOrderTotal(
      drinkIndex,
      sizeIndex,
      selectedAddOns,
      drinkPrices,
      addOnPrices,
      selectedCustomer
    );

    const newOrder = {
      id: Date.now() + Math.random(),
      drink: drinkName,
      size: sizeName,
      drinkIndex: drinkIndex,
      sizeIndex: sizeIndex,
      customerType: customerTypes[selectedCustomer],
      addOns: selectedAddOns.map(index => addOnNames[index]),
      addOnIndices: [...selectedAddOns],
      total: totals.total,
      price: price
    };

    // Add the new order
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    
    // ✅ Recalculate grand total from scratch
    // This ensures the grand total always matches the sum of all orders
    const newGrandTotal = calculateGrandTotal(updatedOrders);
    
    // We need to update GrandTotal component
    // We'll use a ref or state to pass this down
    // For now, we'll use the state setter

    setShowSuccess(true);

    setSelectedDrink(null);
    setSelectedSize(null);
    setSelectedAddOns([]);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  // ===== HANDLE CANCEL ORDER (REMOVE ALL) =====
  const handleRemoveFromOrder = ({ drinkIndex, sizeIndex, removeAll }) => {
    let updatedOrders;

    if (removeAll) {
      // Remove ALL orders with this drink+size combination
      updatedOrders = orders.filter(
        order => !(order.drinkIndex === drinkIndex && order.sizeIndex === sizeIndex)
      );
    } else {
      // Single removal (for backward compatibility)
      const orderIndex = orders.findLastIndex(
        order => order.drinkIndex === drinkIndex && order.sizeIndex === sizeIndex
      );

      if (orderIndex !== -1) {
        updatedOrders = [...orders];
        updatedOrders.splice(orderIndex, 1);
      } else {
        updatedOrders = orders;
      }
    }

    // ✅ Update orders and recalculate grand total
    setOrders(updatedOrders);
    
    // Grand total will be recalculated in the GrandTotal component
    // We pass orders and it calculates the sum
  };

  // ===== EVENT HANDLERS =====
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
      setSelectedDrink(null);
      setSelectedSize(null);
      setSelectedAddOns([]);
      setSelectedCustomer(0);
      setShowSuccess(false);
    }
  };

  // ===== RECALCULATE GRAND TOTAL =====
  const grandTotal = calculateGrandTotal(orders);

  // ===== RENDER =====
  return (
    <div className="app">
      <header className="app-header">
        <h1>☕ The ODD Atelier </h1>
        <p className="subtitle">Order your favorite drinks with custom add-ons</p>
      </header>

      <div className="main-content">
        <div className="left-panel">
          <DrinkMenu 
            onAddToOrder={handleAddToOrder}
            onRemoveFromOrder={handleRemoveFromOrder}
          />
          
          <CustomerType 
            selectedCustomer={selectedCustomer} 
            onSelectCustomer={handleSelectCustomer} 
          />
          
          <AddOnSelector 
            selectedAddOns={selectedAddOns} 
            onToggleAddOn={handleToggleAddOn} 
          />

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
        <p>Made with ❤️ | The ODD Atelier</p>
      </footer>
    </div>
  );
}

export default App;