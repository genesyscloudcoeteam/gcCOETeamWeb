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
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {
  const location = useLocation();

  // Function to initialize Genesys script
  const initializeApp = () => {
    console.log("Initializing Genesys script...");

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
        deploymentId: 'e20c3572-d92f-4518-9b9d-0049083dc914'
      });
    } else {
      console.log("Genesys script already loaded.");
    }
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
      "/register": "Register",
      "/login": "Login",
    };

    // Handle dynamic title for product pages
    const currentTitle = location.pathname.startsWith("/product/")
      ? "Product Details"
      : titles[location.pathname] || "gcCOETeamWeb";

    document.title = currentTitle;
  }, [location]);

  return (
    <Router>
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
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

// Wrapper to include Router with a base path
const AppWrapper = () => (
  <Router basename="/gcCOETeamWeb">
    <App />
  </Router>
);

export default AppWrapper;
