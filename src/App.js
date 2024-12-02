/* global Genesys */

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Shop from "./components/Shop";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import CookieConsent from "./components/CookieConsent"; // Import the cookie consent component

const App = () => {
  const location = useLocation();

 // Function to initialize Genesys script
const initializeApp = () => {
  console.log("Initializing Genesys script...");

  // Check if the script is already loaded
  if (!document.querySelector('script[src="https://apps.mypurecloud.ie/genesys-bootstrap/genesys.min.js"]')) {
    (function (g, e, n, es, ys) {
      g['_genesysJs'] = e;
      g[e] = g[e] || function () {
        (g[e].q = g[e].q || []).push(arguments);
      };
      g[e].t = 1 * new Date();
      g[e].c = es;
      ys = document.createElement('script');
      ys.async = 1;
      ys.src = n;
      ys.charset = 'utf-8';
      document.head.appendChild(ys);
    })(window, 'Genesys', 'https://apps.mypurecloud.ie/genesys-bootstrap/genesys.min.js', {
      environment: 'prod-euw1',
      deploymentId: 'e20c3572-d92f-4518-9b9d-0049083dc914',
    });
  } else {
    console.log("Genesys script already loaded.");
  }

  // Wait for Genesys to be available
  const waitForGenesys = setInterval(() => {
    if (window.Genesys) {
      clearInterval(waitForGenesys); // Stop checking once Genesys is available

      console.log("Genesys script is loaded. Subscribing to events...");

      // Subscribe to the "Journey.ready" event
      Genesys("subscribe", "Journey.ready", function () {
        console.log("Journey plugin is ready.");
      });

      // Other commands can also be issued here
    }
  }, 100); // Check every 100ms
};

  // Initialize Genesys script when the app loads
  useEffect(() => {
    initializeApp();
  }, []);

  // Update the page title dynamically based on the route
  useEffect(() => {
    const titles = {
      "/": "Home",
      "/about": "About",
      "/shop": "Shop",
      "/cart": "Cart",
      "/checkout": "Checkout",
    };

    const currentTitle = location.pathname.startsWith("/product/")
      ? "Product Details"
      : titles[location.pathname] || "gcCOETeamWeb";

    document.title = currentTitle;
  }, [location]);

  return (
    <div id="root">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent /> {/* Add the cookie consent banner */}
    </div>
  );
};

const AppWrapper = () => (
  <Router basename="/gcCOETeamWeb">
    <App />
  </Router>
);

export default AppWrapper;
