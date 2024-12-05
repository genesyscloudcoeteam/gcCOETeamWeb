/* global Genesys */
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onRegisterClick, onLoginClick }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/checkout">Checkout</Link>
        </li>
        <li>
          <button onClick={onRegisterClick}>Register</button>
        </li>
        <li>
          <button onClick={onLoginClick}>Login</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
