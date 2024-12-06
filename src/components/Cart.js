/* global Genesys */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { executeGenesysCommand } from "./utils/genesysHelper";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const userId = "demo-user-id"; // Replace with actual user ID.
    axios.get(`https://your-api-endpoint/cart/${userId}`).then((response) => {
      setCart(response.data);
    });
  }, []);

  const simulateCheckout = () => {
    axios.post("https://your-api-endpoint/checkout", {
      userId: "demo-user-id", // Replace with actual user ID.
      cart,
    });
    alert("Order placed successfully!");
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.productId}>
            {item.name} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>
      <button onClick={simulateCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
