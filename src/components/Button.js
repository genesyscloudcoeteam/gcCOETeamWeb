/* global Genesys */
import React from "react";
import { executeGenesysCommand } from "../utils/genesysHelper";

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
