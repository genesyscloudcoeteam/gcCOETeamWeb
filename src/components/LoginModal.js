/* global Genesys */
import React, { useState } from "react";

const LoginModal = ({ cookieConsent, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cookieConsent === "accept" && window.Genesys) {
      Genesys("command", "Journey.formsTrack", {
        selector: "#login-form",
        formName: "User Login",
        captureFormDataOnAbandon: true,
        customAttributes: { isLoginSubmitted: true },
        traitsMapper: [
          { fieldName: "email", traitName: "email" },
        ],
      });
      console.log("Genesys: User Login Submitted");
    }

    onClose(); // Close modal after successful submission
  };

  const handleCancel = () => {
    if (cookieConsent === "accept" && window.Genesys) {
      Genesys("command", "Journey.formsTrack", {
        selector: "#login-form",
        formName: "User Login",
        captureFormDataOnAbandon: true,
        customAttributes: { isLoginSubmitted: false },
        traitsMapper: [
          { fieldName: "email", traitName: "email" },
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
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;