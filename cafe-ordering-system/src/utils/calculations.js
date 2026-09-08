/**
 * calculations.js - Contains all calculation logic for the cafe ordering system
 * These functions mirror the logic from your Java console application
 */

import { discounts } from '../data/menuData';

/**
 * Calculates the total price for a single order
 */
export const calculateOrderTotal = (
  drinkIndex,
  sizeIndex,
  addOnIndices,
  drinkPrices,
  addOnPrices,
  customerTypeIndex
) => {
  // Check if drink and size are selected
  if (drinkIndex === null || sizeIndex === null) {
    return {
      subtotal: 0,
      discountAmount: 0,
      total: 0,
      drinkPrice: 0,
      addOnsTotal: 0
    };
  }

  // Step 1: Calculate drink price
  const drinkPrice = drinkPrices[drinkIndex][sizeIndex];
  
  // Step 2: Calculate add-ons total
  let addOnsTotal = 0;
  addOnIndices.forEach(index => {
    addOnsTotal += addOnPrices[index];
  });
  
  // Step 3: Calculate subtotal
  const subtotal = drinkPrice + addOnsTotal;
  
  // Step 4: Calculate discount
  const discountRate = discounts[customerTypeIndex] || 0;
  const discountAmount = subtotal * discountRate;
  
  // Step 5: Calculate final total
  const total = subtotal - discountAmount;
  
  return {
    subtotal,
    discountAmount,
    total,
    drinkPrice,
    addOnsTotal
  };
};

/**
 * Formats a number as currency (Philippine Peso)
 */
export const formatCurrency = (amount) => {
  return `₱${amount.toFixed(2)}`;
};

/**
 * Validates if an order can be placed
 */
export const isValidOrder = (drinkIndex, sizeIndex) => {
  return drinkIndex !== null && sizeIndex !== null;
};