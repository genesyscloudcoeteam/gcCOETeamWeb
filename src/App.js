/* global Genesys */
/* global ac */
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
import { executeAcCommand } from "./utils/acHelper";

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
      loadGenesysScript("e20c3572-d92f-4518-9b9d-0049083dc914");

      // Load Journey SDK (AC)
      if (!document.querySelector(`script[src="https://apps.mypurecloud.ie/journey/sdk/js/web/v1/ac.js"]`)) {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://apps.mypurecloud.ie/journey/sdk/js/web/v1/ac.js";
        script.charset = "utf-8";
        document.head.appendChild(script);

        script.onload = () => {
          console.log("Journey SDK script loaded.");
          executeAcCommand("init", "3b03b67a-2349-4a03-8b28-c8ac5c26c49a", { region: "euw1" });
          executeAcCommand("load", "autotrackUrlChange");
        };

        script.onerror = (error) => {
          console.error("Error loading Journey SDK script:", error);
        };
      }

      // Subscribe to Genesys events
      const waitForGenesys = setInterval(() => {
        if (window.Genesys) {
          clearInterval(waitForGenesys);
          Genesys("subscribe", "Toaster.ready", () => {
            Genesys(
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
              () => console.log("Toaster is opened."),
              (error) => console.error("Error running Toaster.open command:", error)
            );
          });
        }
      }, 100);
    } else if (cookieConsent === "decline") {
      console.log("User declined cookies. Loading alternative Genesys script.");

      // Load the Genesys script
      loadGenesysScript("92f95b32-1773-40f4-a3c3-9efbc734dc10");

      const waitForGenesys = setInterval(() => {
        if (window.Genesys) {
          clearInterval(waitForGenesys);
          console.log("Genesys script loaded for decline logic.");
        }
      }, 100);
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
