/* global Genesys */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { executeGenesysCommand } from "../utils/genesysHelper";

const Navbar = ({ onRegisterClick, onLoginClick, cookieConsent }) => {
  const [isGenesysReady, setIsGenesysReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkGenesysAvailability = () => {
      if (window.Genesys) {
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

  const handleRegisterClick = () => {
    // Navigate to the Register page
    navigate("/register");
  };

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
        <li>
          {isGenesysReady && (
            <Link to="/register">Register</Link>
          )}
        </li>
      </ul>
      <div className="navbar-buttons">
        {isGenesysReady && (
          <>
            <li>
              <button onClick={onLoginClick}>Login</button>
            </li>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
