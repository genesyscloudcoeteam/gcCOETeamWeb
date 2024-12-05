/* global Genesys */
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onRegisterClick, onLoginClick }) => {
  const isGenesysReady = window.Genesys;
  return (
    <nav className="navbar">
      <ul className="navbar-links">
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
      </ul>
      <div className="navbar-buttons">
        {isGenesysReady && (
          <>
            <button onClick={onRegisterClick}>Register</button>
            <button onClick={onLoginClick}>Login</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
