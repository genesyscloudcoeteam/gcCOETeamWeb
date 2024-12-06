/* global Genesys */
import React, { useState } from "react";
import axios from "axios";
import { executeGenesysCommand } from "./utils/genesysHelper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios.post("https://your-api-endpoint/login", { email, password }).then(() => {
      alert("Login successful!");
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
