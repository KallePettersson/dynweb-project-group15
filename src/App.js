import HeaderView from "./js/views/headerView";
import MapPresenter from "./js/presenters/mapPresenter";
import SelectionPresenter from "./js/presenters/SelectionPresenter";
import DetailsPresenter from "./js/presenters/detailsPresenter";
import FooterView from "./js/views/footerView";
import React from "react";
import {useDispatch} from "react-redux";


function App() {
    return (
        <div className="app-container">
            <HeaderView className="header"/>
            <div className="presenter-container">
                <MapPresenter/>
                <div className="row-flex">
                    <SelectionPresenter/>
                    <DetailsPresenter/>
                </div>
            </div>
            <FooterView className="footer"/>
        </div>
    );
}

export default App;
