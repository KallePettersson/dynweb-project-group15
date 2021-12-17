import {useSelector} from "react-redux";
import CountryCodes from "../countryCodes";
import ApiHandler from "../api-handler";
import updateColorGradient from "../presenters/colorGradientPresenter";
import {Criteria} from "../criteria";
import ColorConfig from "../colorConfig";

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
            let res = {
                ...state,
                countries: processedData,
                dataFetched: true,
            }
            console.log("dataAfter", processedData, res)
            return res;
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

/**
 * Determines what color a country should get based on the value of the given criteria
 * @param value
 * @returns {string|*}
 */
function getColourGradient(value) {
    if (value === null) {
        return "defaultFill"; //Default color when data is not available
    }
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

function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}


export default reducer;