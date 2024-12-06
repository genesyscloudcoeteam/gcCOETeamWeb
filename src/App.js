/* global Genesys */
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import { executeGenesysCommand } from "./utils/genesysHelper";

const App = () => {
  const [cookieConsent, setCookieConsent] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation(); // Ensures useLocation is inside a valid Router context

  // Check for existing cookie consent on initial load
  useEffect(() => {
    const storedConsent = sessionStorage.getItem("cookieConsent");
    if (storedConsent) {
      setCookieConsent(storedConsent);
    }
  }, []);

  // Genesys Script Initialization
  const loadGenesysScript = (deploymentId) => {
    if (!document.querySelector(`script[src="https://apps.mypurecloud.ie/genesys-bootstrap/genesys.min.js"]`)) {
      (function (g, e, n, es, ys) {
        g["_genesysJs"] = e;
        g[e] = g[e] || function () {
          (g[e].q = g[e].q || []).push(arguments);
        };
        g[e].t = 1 * new Date();
        g[e].c = es;
        ys = document.createElement("script");
        ys.async = 1;
        ys.src = n;
        ys.charset = "utf-8";
        document.head.appendChild(ys);
      })(window, "Genesys", "https://apps.mypurecloud.ie/genesys-bootstrap/genesys.min.js", {
        environment: "prod-euw1",
        deploymentId: deploymentId,
      });
    }
  };

  // Initialize Genesys and AC Scripts on Consent
  useEffect(() => {
    if (cookieConsent === "accept") {
      console.log("User accepted cookies. Loading scripts.");

      // Load the Genesys script
      // gcCOETeam - Messenger Only = 92f95b32-1773-40f4-a3c3-9efbc734dc10
      // gcCOETeam = e20c3572-d92f-4518-9b9d-0049083dc914

      loadGenesysScript("e20c3572-d92f-4518-9b9d-0049083dc914");

      // Subscribe to Genesys events
      executeGenesysCommand("subscribe", "Toaster.ready", () => {
        executeGenesysCommand(
          "command",
          "Toaster.open",
          {
            title: "Welcome from The Genesys Cloud COE Team",
            body: "Encountering issues? Our support team is ready to troubleshoot and assist you.",
            buttons: {
              type: "binary",
              primary: "Get Support",
              secondary: "Maybe Later",
            },
          },
          function () {
            /*fulfilled callback*/
            console.log("Toaster is opened");
            executeGenesysCommand("command", "Messenger.open",
              {},
              function () {
                /*fulfilled callback*/
                console.log("Toaster offer accepted, messenger opened.")
              },
              function () {
                /*rejected callback*/
                console.log("Toaster offer accepted, but messenger could not be opened.")
              }
            );
          },
          function (error) {
            /*rejected callback*/
            console.error("There was an error running the Toaster.open command:", error);
          }
        );
      });

    } else if (cookieConsent === "decline") {
      console.log("User declined cookies. Loading alternative Genesys script.");

      // Load the Genesys script
      // gcCOETeam - Messenger Only = 92f95b32-1773-40f4-a3c3-9efbc734dc10
      // gcCOETeam = e20c3572-d92f-4518-9b9d-0049083dc914

      loadGenesysScript("92f95b32-1773-40f4-a3c3-9efbc734dc10");

      // Subscribe to Genesys events
      executeGenesysCommand("subscribe", "Toaster.ready", () => {
        executeGenesysCommand(
          "command",
          "Toaster.open",
          {
            title: "Welcome from The Genesys Cloud COE Team",
            body: "Encountering issues? Our support team is ready to troubleshoot and assist you.",
            buttons: {
              type: "binary",
              primary: "Get Support",
              secondary: "Maybe Later",
            },
          },
          function () {
            /*fulfilled callback*/
            console.log("Toaster is opened");
            executeGenesysCommand("command", "Messenger.open",
              {},
              function () {
                /*fulfilled callback*/
                console.log("Toaster offer accepted, messenger opened.")
              },
              function () {
                /*rejected callback*/
                console.log("Toaster offer accepted, but messenger could not be opened.")
              }
            );
          },
          function (error) {
            /*rejected callback*/
            console.log("There was an error running the Toaster.open command:", error);
          }
        );
      });
    }
  }, [cookieConsent]);

  // Dynamically Update Page Titles Based on Routes
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
      <Navbar
        onRegisterClick={() => setIsRegisterModalOpen(true)}
        onLoginClick={() => setIsLoginModalOpen(true)}
        cookieConsent={cookieConsent}
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
      <CookieConsent onConsent={(consent) => setCookieConsent(consent)} />
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
  );
};

export default App;
