import React, {useEffect, useState} from "react";
import "../css/Home.css";
import MapPresenter from "./presenters/mapPresenter";
import SelectionPresenter from "./presenters/SelectionPresenter";
import CountryCodes from "./countryCodes";
import ApiHandler from "./api-handler";
import {useDispatch, useSelector} from "react-redux";
import ColorConfig from "./colorConfig";
import {Criteria} from "./criteria";
import updateColorGradient from "./presenters/colorGradientPresenter"

function HomeContainer() {
    const dispatch = useDispatch();
    const criteria = useSelector(
        state => state.selectorReducer.criteria
    );

    const dataFetched = useSelector(
        state => state.countriesReducer.dataFetched
    );

    const cityDataFetched = useSelector(
        state => state.citiesReducer.cityDataFetched
    );

    const selectedCountry = useSelector(
        state => state.selectorReducer.country
    );



    if (!dataFetched) {
        let promises = Object.values(CountryCodes).map((name) => ApiHandler.getCountryIndices(name));
        Promise.all(promises).then(rawData => {
            let reducedData = rawData.reduce((accumulator, data) => {
                accumulator[getKeyByValue(CountryCodes, data.name)] = data;
                return accumulator;
            }, {})

            let processedData = setupForEachCountryDataPoint(reducedData, criteria);
            console.log("dataAfter", processedData)

            dispatch({
                type: "UPDATE_COUNTRIES",
                payload: {
                    countries: processedData
                }
            });
            dispatch({
                type: "SET_DATA_FETCHED_TRUE",
            });
        });
    } else {
        console.log("dont fetch data");
    }


    return (
        <div className="wrapper">
            <SelectionPresenter/>
            <MapPresenter/>
        </div>
    );
}

function getColourGradient(value) {
    if (value === null) {
        return "defaultFill"; //Default color when data is not available
    }
    // let min = this.metaData[this.metaData.currentDataKey].min;
    // let max = this.metaData[this.metaData.currentDataKey].max;
    let min = 0;
    let max = 100;
    if (value < min) {
        value = min;
    } else if (value >= max) {
        value = (max - 0.01); //ugly hack to fix edge case
    }
    let colourIndex = Math.floor(((value - min) / ((max - min) / 10)));
    return ColorConfig.colourKeys[colourIndex]
}

function setupForEachCountryDataPoint(countriesData, selectedCriteria) {
    if (countriesData !== null) {
        updateColorGradient();
        // console.log("this.countryData - setupForEachCountryDataPoint", this.countryData);
        // console.log("this.countryData - setupForEachCountryDataPoint", this.countryData !== null);
        // console.log("this.countryData - setupForEachCountryDataPoint", Object.entries(this.countryData).length);
        let newCountryData = {};
        Object.entries(countriesData).forEach(country => {
            newCountryData[country[0]] = country[1];
            newCountryData[country[0]]["fillKey"] = getColourGradient(country[1][selectedCriteria]) // Set colour for given country

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

export default HomeContainer;
