import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import HomeContainer from "./js/HomeContainer";
import HeaderView from "./js/views/headerView";
import "./css/Home.css";
import { Provider } from "react-redux";
import store from "./js/store";
import FooterView from "./js/views/footerView";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HeaderView className="header" />
      <HomeContainer />
      <FooterView className="footer" />
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
