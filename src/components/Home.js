/* global Genesys */
import React from "react";
import { executeGenesysCommand } from "../utils/genesysHelper";

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Demo Retail Store</h1>
      <p style="text-align: center">Your one-stop shop for all things amazing!</p>
      <img style="display:flex;justify-content:center;text-align:center;width:100%;height:auto;"
      src={`${process.env.PUBLIC_URL}/images/retailImages.jpg`} // Use PUBLIC_URL
      alt="Homepage"
    />
    </div>
  );
};

export default Home;