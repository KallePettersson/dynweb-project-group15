import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import HomeContainer from "./home/HomeContainer";
import Header from "./home/Header";
import "./home/Home.css";
import SelectionModel from "../src/SelectionModel";
import DBCountriesModel from "../src/DBCountriesModel";
import MetaDataModel from "./MetaDataModel";

let metaDataModel = new MetaDataModel();
let model = new SelectionModel();
let db = new DBCountriesModel();
setTimeout(() => console.log(model.search(db, metaDataModel).results), 5000);

ReactDOM.render(
  <React.StrictMode>
    <Header className="header" />
    <HomeContainer model={model} db={db} metaData={metaDataModel} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
