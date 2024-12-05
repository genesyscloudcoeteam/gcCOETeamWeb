/* global Genesys */
import React, { useState, useEffect } from "react";
import { executeAcCommand } from "../utils/acHelper";

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
    <div className="cookie-banner">
      <p className="cookie-banner-text">
        We use cookies to improve your experience. You can accept or decline
        the use of cookies for this session.
      </p>
      <div className="cookie-banner-buttons">
        <button onClick={handleAccept} className="cookie-banner-accept-button">
          Accept
        </button>
        <button onClick={handleDecline} className="cookie-banner-decline-button">
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;