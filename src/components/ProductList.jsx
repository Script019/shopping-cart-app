import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import products from "../data/products";

const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <h2>Available Products</h2>
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>${product.price.toFixed(2)}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
