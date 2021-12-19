import React from "react";
import "../../css/mapPresenter.css";
import {useSelector, useDispatch} from "react-redux";
import ColorGradientView from "../views/colorGradientView";
import {ColorConfig} from "../colorConfig";
import "../../css/home.css"
import {fetchCountriesData, updateColorGradient} from "../actions";

function MapPresenter() {
    const dispatch = useDispatch();
    let dataFetched = useSelector(state => state.countriesReducer.dataFetched);

    if (!dataFetched) {
        dispatch(fetchCountriesData());
    }

    const colorGradientOrder = useSelector(state => state.colorReducer.order);
    const minValue = useSelector(state => state.colorReducer.minValue);
    const maxValue = useSelector(state => state.colorReducer.maxValue);

    let fills = colorGradientOrder === "ascending" ?
        Object.entries(ColorConfig.ascendingFills) :
        Object.entries(ColorConfig.descendingFills)

    //Dispatches a call to the renderMap function that inserts the map view into the map div
    const criteria = useSelector(state => state.selectorReducer.criteria);
    const countries = useSelector(state => state.countriesReducer.countries);

    if (dataFetched) {
        dispatch({type: "RENDER_MAP",});
        updateColorGradient(dispatch, countries, criteria);
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
                {dataFetched ? (<></>) : (<div className="image-div">
                    <img
                        height="100"
                        width="100"
                        src={"http://www.csc.kth.se/~cristi/loading.gif"}
                        alt={"Animation when loading"}/>
                </div>)}
                <div id="map" className="world-map"/>
                <ColorGradientView
                    minValue={minValue}
                    maxValue={maxValue}
                    fills={fills}
                />
            </div>
        </div>
    );
}

export default MapPresenter;
