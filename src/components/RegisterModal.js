/* global Genesys */
import React, { useState } from "react";
import axios from "axios";

const RegisterModal = ({ cookieConsent, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // Call the registration API (via Lambda)
      const response = await axios.post(
        "https://ppv7vy7drqzhvsifbmf7mf4bha0jutwh.lambda-url.eu-west-1.on.aws",
        {
          type: "register",
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email          
        }
      );

      // Notify user of success and close modal
      alert(response.data.message);

      console.log("Registration form exists:", document.querySelector("#registration-form"));
      console.log("Genesys is ready:", !!window.Genesys);
      
      if (cookieConsent === "accept" && window.Genesys) {
        Genesys("command", "Journey.formsTrack", {
          selector: "#registration-form",
          formName: "registration",
          captureFormDataOnAbandon: false,
          customAttributes: { isRegistrationSubmitted: true },
        });
        console.log("Genesys: User Registration Submitted");
      }

      onClose();
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred while registering. Please try again.");

      console.log("Registration form exists:", document.querySelector("#registration-form"));
      console.log("Genesys is ready:", !!window.Genesys);

      if (cookieConsent === "accept" && window.Genesys) {
        Genesys("command", "Journey.formsTrack", {
          selector: "#registration-form",
          formName: "registration",
          captureFormDataOnAbandon: false,
          customAttributes: {
            isLoginFormSubmitted: false,
          },
        });
        console.log("Genesys: User Registration Cancelled");
      }

    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (cookieConsent === "accept" && window.Genesys) {

      console.log("Registration form exists:", document.querySelector("#registration-form"));
      console.log("Genesys is ready:", !!window.Genesys);

      Genesys("command", "Journey.formsTrack", {
        selector: "#registration-form",
        formName: "registration",
        captureFormDataOnAbandon: false,
        customAttributes: {
          isLoginFormSubmitted: false,
        },
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
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;