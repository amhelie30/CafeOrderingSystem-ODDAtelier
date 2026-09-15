/**
 * App.js - Main component with per-order add-ons and soft-delete
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
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [deletedOrders, setDeletedOrders] = useState(new Set()); // ✅ Track soft-deleted IDs
  const [showSuccess, setShowSuccess] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // ===== HELPER: Calculate Grand Total (excludes deleted) =====
  const calculateGrandTotal = (orderList) => {
    return orderList
      .filter(order => !deletedOrders.has(order.id))
      .reduce((sum, order) => sum + order.total, 0);
  };

  // ===== HELPER: Count Active Orders (excludes deleted) =====
  const activeOrderCount = orders.filter(o => !deletedOrders.has(o.id)).length;

  // ===== HANDLE ADD TO ORDER =====
  const handleAddToOrder = ({ drinkIndex, sizeIndex, drinkName, sizeName, price }) => {
    setSelectedDrink(drinkIndex);
    setSelectedSize(sizeIndex);
    
    const customerIndex = selectedCustomer ?? 0;
    
    const totals = calculateOrderTotal(
      drinkIndex,
      sizeIndex,
      [],
      drinkPrices,
      addOnPrices,
      customerIndex
    );

    const newOrder = {
      id: Date.now() + Math.random(),
      drink: drinkName,
      size: sizeName,
      drinkIndex: drinkIndex,
      sizeIndex: sizeIndex,
      customerType: customerTypes[customerIndex],
      customerIndex: customerIndex,
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

  // ===== HANDLE CANCEL ORDER (from DrinkMenu badge) =====
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
    // Can't add add-ons to deleted orders
    if (deletedOrders.has(orderId)) return;

    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id !== orderId) return order;

        const isSelected = order.addOnIndices.includes(addOnIndex);
        const newAddOnIndices = isSelected ? [] : [addOnIndex];

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

  // ===== HANDLE MARK ORDER AS DELETED (Soft Delete) =====
  const handleMarkDeleted = (orderId) => {
    setDeletedOrders(prev => {
      const newSet = new Set(prev);
      newSet.add(orderId);
      return newSet;
    });
  };

  // ===== HANDLE UNDO DELETE =====
  const handleUndoDelete = (orderId) => {
    setDeletedOrders(prev => {
      const newSet = new Set(prev);
      newSet.delete(orderId);
      return newSet;
    });
  };

  // ===== HANDLE PERMANENT DELETE =====
  const handlePermanentDelete = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    setDeletedOrders(prev => {
      const newSet = new Set(prev);
      newSet.delete(orderId);
      return newSet;
    });
  };

  // ===== EVENT HANDLERS =====
  const handleSelectCustomer = (index) => {
    setSelectedCustomer(index);
    setShowSuccess(false);
  };

  // ===== HANDLE RESET =====
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all orders?')) {
      setOrders([]);
      setDeletedOrders(new Set());
      setSelectedDrink(null);
      setSelectedSize(null);
      setSelectedCustomer(null);
      setShowSuccess(false);
      setResetKey(prev => prev + 1);
    }
  };

  const grandTotal = calculateGrandTotal(orders);

  return (
    <div className="app">
      <header className="app-header">
        <h1>☕ The Odd Atelier</h1>
        <p className="subtitle">Order your favorite drinks with custom add-ons</p>
      </header>

      <div className="main-content">
        <div className="left-panel">
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
            orders={orders.filter(o => !deletedOrders.has(o.id))}
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

          <OrdersList 
            orders={orders}
            deletedOrders={deletedOrders}
            onMarkDeleted={handleMarkDeleted}
            onUndoDelete={handleUndoDelete}
            onPermanentDelete={handlePermanentDelete}
          />

          <GrandTotal 
            grandTotal={grandTotal} 
            orderCount={activeOrderCount} 
          />
        </div>
      </div>

      <footer className="app-footer">
        <p>Made with ❤️ | The Odd Atelier</p>
      </footer>
    </div>
  );
}

export default App;