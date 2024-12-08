import React, { createContext, useReducer, useContext, useState } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingGameIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingGameIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingGameIndex].cantidad += 1;
        return updatedCart;
      } else {
        return [...state, { ...action.payload, cantidad: 1 }];
      }

    case "REMOVE_FROM_CART":
      return state
        .map((item) =>
          item.id === action.payload ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <CartContext.Provider
      value={{ cart, dispatch, isSidebarOpen, openSidebar, closeSidebar }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
