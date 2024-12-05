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
  const loadGenesysMessengerScript = (deploymentId) => {
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

  const loadGenesysTrackingScript = () => {
    // Dynamically load the Journey SDK script
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://apps.mypurecloud.ie/journey/sdk/js/web/v1/ac.js";
    script.charset = "utf-8";

    script.onload = () => {
      console.log("Journey SDK script loaded. Initializing AC.");
      if (window.ac) {
        window.ac("init", "3b03b67a-2349-4a03-8b28-c8ac5c26c49a", { region: "euw1" });
        window.ac("load", "autotrackUrlChange");
        console.log("AC initialized with autotrackUrlChange.");
      } else {
        console.error("AC object not found after loading the Journey SDK.");
      }
    };

    script.onerror = (error) => {
      console.error("Error loading Journey SDK script:", error);
    };

    document.head.appendChild(script);

  };


  // Initialize Genesys Script on Consent
  useEffect(() => {
    if (cookieConsent === "accept") {
      console.log("User accepted cookies. Loading Legacy Tracking Snippet and Messenger Widget.");
      //loadGenesysScript("e20c3572-d92f-4518-9b9d-0049083dc914");
      loadGenesysTrackingScript();
      loadGenesysMessengerScript("92f95b32-1773-40f4-a3c3-9efbc734dc10");
      
      // Subscribe to Journey.ready event
      const waitForGenesys = setInterval(() => {
        if (window.Genesys) {
          clearInterval(waitForGenesys);

          //Genesys("subscribe", "Journey.ready", function () {
          //  console.log("Journey & Launcher plugin is ready.");
          //});

          Genesys("subscribe", "Toaster.ready", () => {
            Genesys(
              "command",
              "Toaster.open",
              {
                title: "Welcome from The Genesys Cloud COE Team",
                body: "Encountering issues? Our support team is ready to troubleshoot and assist you.",
                buttons: {
                  type: "binary", // required when 'buttons' is present. Values: "unary" for one action button, "binary" for two action buttons
                  primary: "Get Support", // optional, default value is "Accept"
                  secondary: "Maybe Later", // optional, default value is "Decline"
                },
              },
              function () {
                /*fulfilled callback*/
                console.log("Toaster is opened");
              },
              function (error) {
                /*rejected callback*/
                console.log("There was an error running the Toaster.open command:", error);
              }
            );
          });

          Genesys(
            "subscribe",
            "Toaster.accepted",
            function (e) {
              console.log("Toaster was accepted", e);
              Genesys("command", "Messenger.open",
                {},
                function () {
                  console.log("Messenger was opened");
                },
                function () {
                  console.log("Messenger could not be opened");
                }
              );
            }
          );

        }
      }, 100);
    } else if (cookieConsent === "decline") {
      console.log("User declined cookies. Loading alternative Genesys script.");
      loadGenesysScript("92f95b32-1773-40f4-a3c3-9efbc734dc10");

      const waitForGenesys = setInterval(() => {
        console.log("Checking Genesys availability...");
        if (window.Genesys) {
          clearInterval(waitForGenesys);
          console.log("Genesys script loaded for decline logic.");

          try {
            Genesys("subscribe", "Launcher.ready", function () {
              console.log("Launcher plugin is ready.");
            });

            Genesys("subscribe", "Toaster.ready", () => {
              console.log("Toaster plugin is ready. Opening toaster.");
              Genesys(
                "command",
                "Toaster.open",
                {
                  title: "Welcome from The Genesys Cloud COE Team",
                  body: "Encountering issues? Our support team is ready to troubleshoot and assist you.",
                  buttons: {
                    type: "binary", // required when 'buttons' is present. Values: "unary" for one action button, "binary" for two action buttons
                    primary: "Get Support", // optional, default value is "Accept"
                    secondary: "Maybe Later", // optional, default value is "Decline"
                  },
                },
                function () {
                  console.log("Toaster is opened.");
                },
                function (error) {
                  console.error("Error running Toaster.open command:", error);
                }
              );
            });

            Genesys("subscribe", "Toaster.accepted", function (e) {
              console.log("Toaster was accepted", e);
              Genesys(
                "command",
                "Messenger.open",
                {},
                function () {
                  console.log("Messenger was opened.");
                },
                function () {
                  console.error("Messenger could not be opened.");
                }
              );
            });
          } catch (error) {
            console.error("Error executing Genesys commands:", error);
          }
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