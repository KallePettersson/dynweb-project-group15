import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import HomeContainer from "./home/HomeContainer";
import Header from "./home/Header";
import "./home/Home.css";
import SelectionModel from "../src/SelectionModel";
import DBCountriesModel from "../src/DBCountriesModel";
import MetaDataModel from "./MetaDataModel";
import GeoLocoModel from "./model";
import Footer from "./home/Footer";

let model = new GeoLocoModel();
ReactDOM.render(
  <React.StrictMode>
    <div>
      <div className="container">
        <Header className="header" />
        <HomeContainer model={model} />
        <Footer className="footer" />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
