import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import HomeContainer from "./home/HomeContainer";
import Header from "./home/Header";
import "./home/Home.css";
import GeoLocoModel from "./model";
import DevSelectorPresenter from "./presenters/devSelectorPresenter";
import { Provider } from "react-redux";
import store from "./store";
import DevResultsPresenter from "./presenters/devResultsPresenter";
import Footer from "./home/Footer";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header className="header" />
      <HomeContainer />
      <Footer className="footer" />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// ReactDOM.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <DevSelectorPresenter/>
//             <DevResultsPresenter/>
//         </Provider>
//     </React.StrictMode>,
//     document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
