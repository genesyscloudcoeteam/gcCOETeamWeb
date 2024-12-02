/* global Genesys */
import React, { useState, useEffect } from "react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if the user has already provided consent in the current session
    const consent = sessionStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true); // Show the banner if consent is not found
    }
  }, []);

  const handleAccept = () => {
    // Save acceptance to sessionStorage
    sessionStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false); // Hide the banner

    // Track cookie acceptance via Genesys
    if (window.Genesys) {
      Genesys("command", "Journey.formsTrack", {
        formName: "Cookie Consent",
        customAttributes: { cookieConsent: "accepted" },
      });
      console.log("Genesys: Cookie Consent Accepted");
    } else {
      console.log("Genesys is not available for tracking.");
    }
  };

  const handleDecline = () => {
    // Save decline to sessionStorage
    sessionStorage.setItem("cookieConsent", "declined");
    setShowBanner(false); // Hide the banner

    // Track cookie decline via Genesys
    if (window.Genesys) {
      Genesys("command", "Journey.formsTrack", {
        formName: "Cookie Consent",
        customAttributes: { cookieConsent: "declined" },
      });
      console.log("Genesys: Cookie Consent Declined");
    } else {
      console.log("Genesys is not available for tracking.");
    }
  };

  return (
    showBanner && (
      <div style={styles.banner}>
        <p style={styles.text}>
          We use cookies to improve your experience on our website. You can
          accept or decline the use of cookies for this session.
        </p>
        <div style={styles.buttons}>
          <button onClick={handleAccept} style={styles.acceptButton}>
            Accept
          </button>
          <button onClick={handleDecline} style={styles.declineButton}>
            Decline
          </button>
        </div>
      </div>
    )
  );
};

// Inline styles for the banner
const styles = {
  banner: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#152450",
    color: "#fff",
    textAlign: "center",
    padding: "10px 20px",
    boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  text: {
    margin: "0 0 10px 0",
    fontFamily: "'Poppins', sans-serif",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  acceptButton: {
    backgroundColor: "#28a745", // Green for accept
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 15px",
    fontFamily: "'Poppins', sans-serif",
    cursor: "pointer",
  },
  declineButton: {
    backgroundColor: "#dc3545", // Red for decline
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 15px",
    fontFamily: "'Poppins', sans-serif",
    cursor: "pointer",
  },
};

export default CookieConsent;
