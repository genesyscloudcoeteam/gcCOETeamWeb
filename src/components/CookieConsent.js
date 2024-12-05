/* global Genesys */
import React, { useState, useEffect } from "react";

const CookieConsent = ({ onConsent }) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = sessionStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    } else {
      onConsent(consent); // Notify parent of the stored consent value
    }
  }, [onConsent]);

  const handleAccept = () => {
    sessionStorage.setItem("cookieConsent", "accept");
    setShowBanner(false);
    onConsent("accept");
  };

  const handleDecline = () => {
    sessionStorage.setItem("cookieConsent", "decline");
    setShowBanner(false);
    onConsent("decline");
  };

  if (!showBanner) return null;

  return (
    <div style={styles.banner}>
      <p style={styles.text}>
        We use cookies to improve your experience. You can accept or decline
        the use of cookies for this session.
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
  );
};

const styles = {
  banner: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#152450",
    color: "#fff",
    textAlign: "center",
    padding: "10px",
    zIndex: 1000,
    boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.2)",
  },
  text: {
    marginBottom: "10px",
    fontSize: "14px",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  acceptButton: {
    backgroundColor: "#28a745",
    padding: "10px 15px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  declineButton: {
    backgroundColor: "#dc3545",
    padding: "10px 15px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default CookieConsent;
