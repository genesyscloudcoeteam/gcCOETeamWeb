/* global Genesys */
import React, { useState } from "react";

const Navbar = ({ onRegisterClick, onLoginClick }) => {
  return (
    <nav>
      <h1>Demo Retail Store</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/shop">Shop</a></li>
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
