import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import HomeContainer from "./home/HomeContainer";
import Header from "./home/Header";
import "./home/Home.css";

ReactDOM.render(
  <React.StrictMode>
    <Header className="header" />
    <HomeContainer />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
