/* global Genesys */
import React from "react";
import { executeAcCommand } from "./utils/acHelper";

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
