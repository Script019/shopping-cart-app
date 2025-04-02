import React from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import "./index.css"; // Optional, for styling

function App() {
  return (
    <CartProvider>
      <div className="container">
        <h1>Shopping Cart Demo</h1>
        <div className="content">
          <div className="left">
            <ProductList />
          </div>
          <div className="right">
            <Cart />
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
