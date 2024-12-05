/* global Genesys */
import React, { useState } from "react";
import axios from "axios";

const LoginModal = ({ cookieConsent, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Still required in the form but not sent
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the login API (via Lambda)
      const response = await axios.post("https://ppv7vy7drqzhvsifbmf7mf4bha0jutwh.lambda-url.eu-west-1.on.aws", {
        type: "login",
        email: email
      });

      const { message, email: userEmail, firstName, lastName, crmId } = response.data;

      // Save user details in sessionStorage
      sessionStorage.setItem("userEmail", userEmail);
      sessionStorage.setItem("firstName", firstName);
      sessionStorage.setItem("lastName", lastName);
      sessionStorage.setItem("crmId", crmId);

      // Genesys logic: tracking the login event
      if (cookieConsent === "accept") {
        console.log("Cookie consent accepted. Proceeding with Genesys logic.");

        if (window.Genesys) {
          //console.log("Genesys object is available. Recording login event.");

          //Genesys("command", "Journey.record", {
          //  eventName: "userLogin",
          //  customAttributes: {
          //    isLoginFormSubmitted: true,
          //    email: userEmail,
          //    givenName: firstName,
          //    familyName: lastName,
          //    crmId: crmId,
          //  },
          //  traitsMapper: [
          //    { fieldName: "email"},
          //    { fieldName: "givenName"},
          //    { fieldName: "familyName"},
          //  ],
          //});

          //console.log("Genesys: User login event recorded.");

          console.log("Login form exists:", document.querySelector("#login-form"));
          console.log("Genesys is ready:", !!window.Genesys);

          Genesys("command", "Journey.formsTrack", {
            selector: "#login-form",
            formName: "login",
            captureFormDataOnAbandon: false,
            captureFormDataOnSubmit: true,
            customAttributes: {
              isLoginFormSubmitted: true,
              email: email,
              givenName: firstName,
              familyName: lastName,
              crmId: crmId,
            },
            traitsMapper: [
              { fieldName: "email"},
              { fieldName: "givenName"},
              { fieldName: "familyName"},  
            ],
          });
          console.log("Genesys: User login form recorded.");

        } else {
          console.error("Genesys object is not available. Ensure Genesys script is loaded.");
        }
      } else {
        console.warn("Cookie consent is not accepted. Genesys logic skipped.");
      }

      alert(message); // Notify user of success
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error during login:", error);
      alert(
        error.response?.data?.message || "An error occurred during login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (cookieConsent === "accept" && window.Genesys) {

      console.log("Login form exists:", document.querySelector("#login-form"));
      console.log("Genesys is ready:", !!window.Genesys);
      
      Genesys("command", "Journey.formsTrack", {
        selector: "#login-form",
        formName: "login",
        captureFormDataOnAbandon: false,
        captureFormDataOnSubmit: false,
        customAttributes: {
          isLoginFormSubmitted: false,
        },
      });
      console.log("Genesys: User Login Form Cancelled");
    }

    onClose(); // Close modal
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Login</h2>
        <form id="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;