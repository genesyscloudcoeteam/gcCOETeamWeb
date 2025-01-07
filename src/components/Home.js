/* global Genesys */
import React from "react";
import { executeGenesysCommand } from "../utils/genesysHelper";

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Welcome to our Demo Retail Store</h1>
        <p>Your one-stop shop for all things amazing!</p>
        <div className="image-container">
            <img
              src={`${process.env.PUBLIC_URL}/images/retailImages.jpg`} // Use PUBLIC_URL
              alt="Homepage"
              className="fade-image"
            />
        </div>
      </div>
    </div>
  );
};

export default Home;