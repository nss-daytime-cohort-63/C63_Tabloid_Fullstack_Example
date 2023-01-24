import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./Header";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
};
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <App />
  </React.StrictMode>,
);

reportWebVitals();