import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  //These methods are just placeholders for auto-completion
  //They will be defined and added in CartProvider
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
