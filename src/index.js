/* global Genesys */
import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

// Get the root element
const rootElement = document.getElementById("root");

// Create a root and render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Router basename="/gcCOETeamWeb">
      <App />
    </Router>
  </React.StrictMode>
);
