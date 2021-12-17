import React from "react";
import "../../css/mapPresenter.css";
import {useSelector, useDispatch} from "react-redux";
import ColorGradientView from "../views/colorGradientView";
import ColorConfig from "../colorConfig";
import "../../css/home.css"

function MapPresenter() {
    const dispatch = useDispatch();

    const colorGradientOrder = useSelector(
        state => state.colorReducer.order
    );
    const minValue = useSelector(
        state => state.colorReducer.minValue
    );
    const maxValue = useSelector(
        state => state.colorReducer.maxValue
    );

    let fills = colorGradientOrder === "ascending" ? Object.entries(ColorConfig.fills).reverse() : Object.entries(ColorConfig.fills)

    //Dispatches a call to the renderMap function that inserts the map view into the map div

    let dataFetched = useSelector(
        state => state.countriesReducer.dataFetched
    );
    while (!dataFetched){

        if (dataFetched) {
            console.log("map being rendered")
            dispatch({
                type: "RENDER_MAP",
            });
        } else {
            // dispatch({
            //     type: "FETCH_COUNTRIES_DATA"
            // })
            // console.log("map not being rendered")
        }
        dataFetched = useSelector(
            state => state.countriesReducer.dataFetched
        );
    }

    return (
        <div className="outer-map-container">
            <div className="inner-map-container">
                <button className="reset-zoom" onClick={() =>
                    dispatch({
                        type: "RESET_MAP_ZOOMING"
                    })
                }>
                    Reset Zoom
                </button>
                <div id="map" className="world-map"/>
                <ColorGradientView
                    minValue={minValue}
                    maxValue={maxValue}
                    order={colorGradientOrder}
                    fills={fills}
                />
            </div>
        </div>
    );
}

export default MapPresenter;
