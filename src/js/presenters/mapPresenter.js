import React from "react";
import "../../css/mapPresenter.css";
import {useSelector, useDispatch} from "react-redux";
import ColorGradientView from "../views/colorGradientView";
import {ColorConfig, getColorGradient} from "../colorConfig";
import "../../css/home.css"
import CountryCodes from "../countryCodes";
import {Criteria} from "../criteria";
import ApiHandler from "../api-handler";
import store from "../store";

function MapPresenter() {
    console.log("Render mapPresenter");
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

    let fills = colorGradientOrder === "ascending" ?
        Object.entries(ColorConfig.ascendingFills) :
        Object.entries(ColorConfig.descendingFills)

    //Dispatches a call to the renderMap function that inserts the map view into the map div

    let dataFetched = useSelector(
        state => state.countriesReducer.dataFetched
    );
    let countries = useSelector(
        state => state.countriesReducer.countries
    );

    const criteria = useSelector(
        state => state.selectorReducer.criteria
    );

    const cityDataFetched = useSelector(
        state => state.citiesReducer.cityDataFetched
    );
    const selectedCountry = useSelector(
        state => state.selectorReducer.country
    );


    if (!dataFetched) {
        fetchCountryDataAndUpdateState(criteria);
    }

    if (dataFetched) {
        console.log("map being rendered")
        dispatch({
            type: "RENDER_MAP",
        });
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
                    />
                </div>)}
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

function fetchCountryDataAndUpdateState(criteria) {
    let promises = Object.values(CountryCodes).map((name) => ApiHandler.getCountryIndices(name));
    Promise.all(promises).then(rawData => {
        let reducedData = rawData.reduce((accumulator, data) => {
            accumulator[getKeyByValue(CountryCodes, data.name)] = data;
            return accumulator;
        }, {})

        let processedData = setupForEachCountryDataPoint(reducedData, criteria);
        console.log("dataAfter", processedData)

        store.dispatch({
            type: "UPDATE_COUNTRIES",
            payload: {
                countries: processedData
            }
        });
        store.dispatch({
            type: "SET_DATA_FETCHED_TRUE",
        });
    });
}

function setupForEachCountryDataPoint(countriesData, selectedCriteria) {
    if (countriesData !== null) {
        store.dispatch({
            type: "UPDATE_COLOR_GRADIENT"
        })

        let minValue = store.getState().colorReducer.minValue;
        let maxValue = store.getState().colorReducer.maxValue;
        let newCountryData = {};
        Object.entries(countriesData).forEach(country => {
            newCountryData[country[0]] = country[1];
            newCountryData[country[0]]["fillKey"] = getColorGradient(country[1][selectedCriteria], minValue, maxValue) // Set colour for given country

            // Extra data needed for popup
            newCountryData[country[0]]["currentDataKey"] = selectedCriteria;
            newCountryData[country[0]]["keyToString"] = Criteria;
        })
        // console.log(newCountryData);
        return newCountryData;
    } else {
        console.log("no country data in setupForEachCountryDataPoint");
        return null;
    }
}

function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}


export default MapPresenter;
