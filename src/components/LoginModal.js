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
      if (cookieConsent === "accept" && window.Genesys) {
        Genesys("command", "Journey.record", {
          eventName: "UserLogin",
          customAttributes: {
            email: userEmail,
            givenName: firstName,
            familyName: lastName,
            crmId: crmId,
          },
          traitsMapper: [
            {"fieldName": "email"},
            {"fieldName": "givenName"},
            {"fieldName": "familyName"},
            {"fieldName": "crmId"}

          ],
        });
        console.log("Genesys: User login recorded");
      }

      if (cookieConsent === "accept" && window.Genesys) {
        Genesys("command", "Journey.formsTrack", {
          selector: "#login-form",
          formName: "User Login",
          captureFormDataOnAbandon: true,
          customAttributes: {
            email: email,
            givenName: firstName,
            familyName: lastName,
            crmId: crmId,
          },
          traitsMapper: [
            {"fieldName": "email"},
            {"fieldName": "givenName"},
            {"fieldName": "familyName"},
            {"fieldName": "crmId"}

          ],
        });
        console.log("Genesys: User Login Submitted");
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
      Genesys("command", "Journey.formsTrack", {
        selector: "#login-form",
        formName: "User Login",
        captureFormDataOnAbandon: true,
        customAttributes: {
          email: email
        },
        traitsMapper: [
          {"fieldName": "email"}
        ],
      });
      console.log("Genesys: User Login Cancelled");
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