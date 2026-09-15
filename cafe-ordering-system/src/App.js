/**
 * App.js - Main component with per-order add-on handling
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
  const [orders, setOrders] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [resetKey, setResetKey] = useState(0); // ✅ NEW: Reset trigger

  // ===== HELPER: Calculate Grand Total =====
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
      [],
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
      customerIndex: selectedCustomer,
      addOns: [],
      addOnIndices: [],
      total: totals.total,
      price: price
    };

    setOrders([...orders, newOrder]);
    setShowSuccess(true);
    setSelectedDrink(null);
    setSelectedSize(null);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  // ===== HANDLE CANCEL ORDER =====
  const handleRemoveFromOrder = ({ drinkIndex, sizeIndex, removeAll }) => {
    let updatedOrders;

    if (removeAll) {
      updatedOrders = orders.filter(
        order => !(order.drinkIndex === drinkIndex && order.sizeIndex === sizeIndex)
      );
    } else {
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

    setOrders(updatedOrders);
  };

  // ===== HANDLE TOGGLE ADD-ON FOR A SPECIFIC ORDER =====
  const handleToggleAddOnForOrder = (orderId, addOnIndex) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id !== orderId) return order;

        const isSelected = order.addOnIndices.includes(addOnIndex);
        const newAddOnIndices = isSelected
          ? order.addOnIndices.filter(i => i !== addOnIndex)
          : [...order.addOnIndices, addOnIndex];

        const totals = calculateOrderTotal(
          order.drinkIndex,
          order.sizeIndex,
          newAddOnIndices,
          drinkPrices,
          addOnPrices,
          order.customerIndex
        );

        return {
          ...order,
          addOnIndices: newAddOnIndices,
          addOns: newAddOnIndices.map(i => addOnNames[i]),
          total: totals.total
        };
      })
    );
  };

  // ===== EVENT HANDLERS =====
  const handleSelectCustomer = (index) => {
    setSelectedCustomer(index);
    setShowSuccess(false);
  };

  // ===== HANDLE RESET (CLEARS EVERYTHING) =====
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all orders?')) {
      // Clear all orders
      setOrders([]);
      
      // Reset selections
      setSelectedDrink(null);
      setSelectedSize(null);
      setSelectedCustomer(0);
      setShowSuccess(false);
      
      // ✅ NEW: Force DrinkMenu to reset its internal state
      setResetKey(prev => prev + 1);
    }
  };

  const grandTotal = calculateGrandTotal(orders);

  return (
    <div className="app">
      <header className="app-header">
        <h1>☕ Brew Haven Cafe</h1>
        <p className="subtitle">Order your favorite drinks with custom add-ons</p>
      </header>

      <div className="main-content">
        <div className="left-panel">
          {/* ✅ NEW: Pass resetKey to DrinkMenu */}
          <DrinkMenu 
            key={resetKey}
            onAddToOrder={handleAddToOrder}
            onRemoveFromOrder={handleRemoveFromOrder}
          />
          
          <CustomerType 
            selectedCustomer={selectedCustomer} 
            onSelectCustomer={handleSelectCustomer} 
          />
          
          <AddOnSelector 
            orders={orders}
            onToggleAddOnForOrder={handleToggleAddOnForOrder}
          />

          <div className="action-buttons">
            <button className="reset-btn" onClick={handleReset}>
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
            selectedAddOns={[]}
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