/* global Genesys */
import React, { useState } from "react";

const LoginModal = ({ onClose }) => {
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

    // Execute Genesys Journey.formsTrack for successful form submission
    if (window.Genesys) {
      Genesys("command", "Journey.formsTrack", {
        selector: "#login-form",
        formName: "User Login",
        captureFormDataOnAbandon: true,
        customAttributes: { isLoginSubmitted: true },
        traitsMapper: [
          { fieldName: "email", traitName: "email" },
        ],
      });
    }

    console.log("Login Data:", formData);
    onClose(); // Close modal after successful submission
  };

  const handleCancel = () => {
    // Execute Genesys Journey.formsTrack for form cancellation
    if (window.Genesys) {
      Genesys("command", "Journey.formsTrack", {
        selector: "#login-form",
        formName: "User Login",
        captureFormDataOnAbandon: true,
        customAttributes: { isLoginSubmitted: false },
      });
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
