/**
 * menuData.js - Contains all static data for the cafe ordering system
 * This data matches exactly with your Java console application
 */

// Drink menu with names and prices
// Each drink has 3 prices: [small, regular, large]
export const drinkNames = [
  'Matcha Strawberry',
  'Spanish Latte',
  'Caramel Macchiato',
  'Hazelnut Roast',
  'Hot Choco'
];

export const drinkPrices = [
  [110, 120, 135],  // Matcha Strawberry
  [115, 125, 140],  // Spanish Latte
  [115, 130, 150],  // Caramel Macchiato
  [112, 120, 145],  // Hazelnut Roast
  [90, 110, 125]    // Hot Choco
];

// Size options (matching your Java code: 1=Small, 2=Regular, 3=Large)
export const sizeNames = ['Small', 'Regular', 'Large'];

// Add-ons menu
export const addOnNames = [
  'Extra Espresso Shot',
  'Soy Milk',
  'Oat Milk',
  'Whipped Cream',
  'Caramel Syrup'
];

export const addOnPrices = [20, 15, 15, 13, 15];

// Customer types and their discounts
// Regular = 0%, Student = 5%, Senior Citizen = 10%, VIP = 15%
export const customerTypes = ['Regular', 'Student', 'Senior Citizen', 'VIP'];
export const discounts = [0.0, 0.05, 0.10, 0.15];