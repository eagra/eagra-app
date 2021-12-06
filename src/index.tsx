import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { CardanoProvider } from "./hooks/useCardano";

ReactDOM.render(
  <React.StrictMode>
    <CardanoProvider>
      <App />
    </CardanoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
