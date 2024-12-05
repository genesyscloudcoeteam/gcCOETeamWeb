/* global Genesys */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { executeAcCommand } from "../utils/acHelper";

const Navbar = ({ onRegisterClick, onLoginClick, cookieConsent }) => {
  const [isGenesysReady, setIsGenesysReady] = useState(false);

  useEffect(() => {
    const checkGenesysAvailability = () => {
      if (window.Genesys || window.ac) {
        //console.log("Genesys is ready and cookies option has been selected.");
        setIsGenesysReady(true);
      } else {
        setIsGenesysReady(false);
      }
    };

    // Run the check initially
    checkGenesysAvailability();

    // Set up an interval to keep checking for Genesys availability
    const interval = setInterval(checkGenesysAvailability, 500);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [cookieConsent]);

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
