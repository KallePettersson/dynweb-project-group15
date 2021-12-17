import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./css/home.css";
import {Provider} from "react-redux";
import store from "./js/store";

import App from "./App";

store.dispatch({
    type: "FETCH_COUNTRIES_DATA"
})

// while(!store.getState().countriesReducer.dataFetched){
// }
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
