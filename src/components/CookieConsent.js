/* global Genesys */
import React, { useState, useEffect } from "react";

const CookieConsent = ({ onConsent }) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = sessionStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
    onConsent("accept");
  };

  const handleDecline = () => {
    sessionStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
    onConsent("decline");
  };

  return (
    showBanner && (
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
    )
  );
};

const styles = {
  banner: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#152450",
    color: "#fff",
    textAlign: "center",
    padding: "10px 20px",
    zIndex: 1000,
  },
  text: { marginBottom: "10px" },
  buttons: { display: "flex", justifyContent: "center", gap: "10px" },
  acceptButton: { backgroundColor: "#28a745", padding: "10px 15px", color: "#fff" },
  declineButton: { backgroundColor: "#dc3545", padding: "10px 15px", color: "#fff" },
};

export default CookieConsent;
