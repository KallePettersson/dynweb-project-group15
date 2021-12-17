import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import HomeContainer from "./js/HomeContainer";
import Header from "./js/Header";
import "./css/Home.css";
import { Provider } from "react-redux";
import store from "./js/store";
import Footer from "./js/Footer";

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
