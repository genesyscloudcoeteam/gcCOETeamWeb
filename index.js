/* global Genesys */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/gcCOETeamWeb">
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);