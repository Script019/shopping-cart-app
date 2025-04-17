import React, { createContext, useReducer, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage"; // Adjust path if needed

export const CartContext = createContext();

const initialState = {
  cartItems: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };

    case "INCREMENT":
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        cartItems: state.cartItems
          .map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0),
      };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  // Load and persist cartItems using the custom hook
  const [storedCart, setStoredCart] = useLocalStorage("cartItems", []);
  const [state, dispatch] = useReducer(cartReducer, { cartItems: storedCart });

  // Save updated cartItems to localStorage when state changes
  useEffect(() => {
    setStoredCart(state.cartItems);
  }, [state.cartItems]);

  const addToCart = item => dispatch({ type: "ADD_ITEM", payload: item });
  const removeFromCart = id => dispatch({ type: "REMOVE_ITEM", payload: id });
  const increment = id => dispatch({ type: "INCREMENT", payload: id });
  const decrement = id => dispatch({ type: "DECREMENT", payload: id });

  const calculateTotal = () => {
    return state.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        increment,
        decrement,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
