import React, { useState } from "react";

const RegisterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Execute Genesys Journey.formsTrack for successful form submission
    if (window.Genesys) {
      Genesys("command", "Journey.formsTrack", {
        selector: "#registration-form",
        formName: "User Registration",
        captureFormDataOnAbandon: true,
        customAttributes: { isRegistrationSubmitted: true },
      });
    }

    console.log("Registration Data:", formData);
    onClose(); // Close modal after successful submission
  };

  const handleCancel = () => {
    // Execute Genesys Journey.formsTrack for form cancellation
    if (window.Genesys) {
      Genesys("command", "Journey.formsTrack", {
        selector: "#registration-form",
        formName: "User Registration",
        captureFormDataOnAbandon: true,
        customAttributes: { isRegistrationSubmitted: false },
      });
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
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
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
