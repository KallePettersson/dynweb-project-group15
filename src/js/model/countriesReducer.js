import {useSelector} from "react-redux";
import CountryCodes from "../countryCodes";
import ApiHandler from "../api-handler";
import updateColorGradient from "../presenters/colorGradientPresenter";
import {Criteria} from "../criteria";
import {getColorGradient} from "../colorConfig";
import store from "../store";

const initialState = {
    countries: {},
    dataFetched: false,
    countryHovered: null
}

const reducer = (state = initialState, action, globalState) => {
    if (action.type === "UPDATE_COUNTRIES") {
        return {
            ...state,
            countries: action.payload.countries,
            dataFetched: true
        }
    } else if (action.type === "UPDATE_COUNTRY_HOVERED") {
        return {
            ...state,
            countryHovered: action.payload.countryHovered,
        }
    } else if (action.type === "FETCH_COUNTRIES_DATA") {
        return FetchCountriesData(state, globalState);
    }
    return state
}


function FetchCountriesData(state, globalState) {
    const criteria = globalState.selectorReducer.criteria
    const dataFetched = state.dataFetched;

    if (!dataFetched) {
        let promises = Object.values(CountryCodes).map((name) => ApiHandler.getCountryIndices(name));
        Promise.all(promises).then(rawData => {
            let reducedData = rawData.reduce((accumulator, data) => {
                accumulator[getKeyByValue(CountryCodes, data.name)] = data;
                return accumulator;
            }, {})

            let processedData = setupForEachCountryDataPoint(reducedData, criteria);
            // let res = {
            //     ...state,
            //     countries: processedData,
            //     dataFetched: true,
            // }
            console.log("dataAfter", processedData)
            return processedData;
        });
    }
    return state
}


function setupForEachCountryDataPoint(countriesData, selectedCriteria) {
    if (countriesData !== null) {
        updateColorGradient();
        // console.log("this.countryData - setupForEachCountryDataPoint", this.countryData);
        // console.log("this.countryData - setupForEachCountryDataPoint", this.countryData !== null);
        // console.log("this.countryData - setupForEachCountryDataPoint", Object.entries(this.countryData).length);
        let newCountryData = {};
        let minValue = store.getState().colorReducer.minValue;
        let maxValue = store.getState().colorReducer.maxValue;
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


export default reducer;