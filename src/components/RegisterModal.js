/* global Genesys */
import React, { useState } from "react";

const RegisterModal = ({ cookieConsent, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }

    if (cookieConsent === "accept" && window.Genesys) {
      Genesys("command", "Journey.formsTrack", {
        selector: "#registration-form",
        formName: "User Registration",
        captureFormDataOnAbandon: true,
        customAttributes: { isRegistrationSubmitted: true },
      });
      console.log("Genesys: User Registration Submitted");
    }

    onClose(); // Close modal after submission
  };

  const handleCancel = () => {
    if (cookieConsent === "accept" && window.Genesys) {
      Genesys("command", "Journey.formsTrack", {
        selector: "#registration-form",
        formName: "User Registration",
        captureFormDataOnAbandon: true,
        customAttributes: { isRegistrationSubmitted: false },
      });
      console.log("Genesys: User Registration Cancelled");
    }

    onClose(); // Close modal
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Register</h2>
        <form id="registration-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
          <button type="submit">Register</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;