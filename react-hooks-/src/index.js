import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthContextProvier from "./auth-context/auth-context";

ReactDOM.render(
  <AuthContextProvier>
    <App />
  </AuthContextProvier>,
  document.getElementById("root")
);
