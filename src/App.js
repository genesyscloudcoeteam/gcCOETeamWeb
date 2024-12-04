/* global Genesys */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Shop from "./components/Shop";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import CookieConsent from "./components/CookieConsent";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";

const App = () => {
  const [cookieConsent, setCookieConsent] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();

  // Initialize Genesys based on consent
  const loadGenesysScript = (deploymentId) => {
    if (!document.querySelector(`script[src="https://apps.mypurecloud.ie/genesys-bootstrap/genesys.min.js"]`)) {
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
        deploymentId: deploymentId,
      });
    }
  };

  // Initialize Genesys based on consent
  useEffect(() => {
    if (cookieConsent === "accept") {
      console.log("User accepted cookies. Loading full Genesys script.");
      loadGenesysScript("e20c3572-d92f-4518-9b9d-0049083dc914");

      // Subscribe to Journey.ready event
      const waitForGenesys = setInterval(() => {
        if (window.Genesys) {
          clearInterval(waitForGenesys);
          Genesys("subscribe", "Journey.ready", function () {
            console.log("Journey plugin is ready.");
          });
        }
      }, 100);
    } else if (cookieConsent === "decline") {
      console.log("User declined cookies. Loading alternative Genesys script.");
      loadGenesysScript("92f95b32-1773-40f4-a3c3-9efbc734dc10");
    }
  }, [cookieConsent]);

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
    <Router basename="/gcCOETeamWeb">
    <div id="root">
      <Navbar
        onRegisterClick={() => setIsRegisterModalOpen(true)}
        onLoginClick={() => setIsLoginModalOpen(true)}
      />
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
      <CookieConsent onConsent={setCookieConsent} />
      {isRegisterModalOpen && (
        <RegisterModal
          cookieConsent={cookieConsent}
          onClose={() => setIsRegisterModalOpen(false)}
        />
      )}
      {isLoginModalOpen && (
        <LoginModal
          cookieConsent={cookieConsent}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </div>
    </Router>
  );
};

export default App;
