import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, calculateTotal } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>Quantity: {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => {
                  if (confirm(`Remove ${item.name} from cart?`)) {
                    removeFromCart(item.id);
                  }
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <hr />
          <p className="total">Total Items: <strong>{totalItems}</strong></p>
          <p className="total">Total: <strong>${calculateTotal().toFixed(2)}</strong></p>
        </>
      )}
    </div>
  );
}

export default Cart;
