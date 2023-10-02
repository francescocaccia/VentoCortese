import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/store.js";

const root = document.getElementById("root");
const appRoot = createRoot(root);

appRoot.render(
  <Provider store={store}>
    <App />
  </Provider>
);
