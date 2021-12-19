import CountryCodes from "./countryCodes";
import ApiHandler from "./api-handler";
import {Criteria, CriteriaOrder} from "./criteria";
import {getColorGradient} from "./colorConfig";

// asynchronous action creator (thunk)
export const fetchCountriesData = () => {
    return (dispatch, getState) => {
        let promises = Object.values(CountryCodes).map((name) => ApiHandler.getCountryIndices(name));
        return Promise.all(promises)
            // Change the structure of the data
            .then(rawData => rawData.reduce((accumulator, data) => {
                accumulator[getKeyByValue(CountryCodes, data.name)] = data;
                return accumulator;
            }, {}))
            // update the values of the colorReducer based on the initial criteria
            .then(data => {
                let state = getState();
                updateColorGradient(dispatch, data, state.selectorReducer.criteria);
                return data;
            })
            // append `fillKey`, `currentDataKey` and `keyToString` to countries
            .then(data => {
                let state = getState()
                let finalCountriesData = {};
                let minValue = state.colorReducer.minValue;
                let maxValue = state.colorReducer.maxValue;
                let selectedCriteria = state.selectorReducer.criteria;
                Object.entries(data).forEach(country => {
                    finalCountriesData[country[0]] = country[1];
                    finalCountriesData[country[0]]["fillKey"] = getColorGradient(country[1][selectedCriteria], minValue, maxValue) // Set colour for given country

                    // Extra data needed for popup
                    finalCountriesData[country[0]]["currentDataKey"] = selectedCriteria;
                    finalCountriesData[country[0]]["keyToString"] = Criteria;
                })
                return finalCountriesData;
            })
            .then(finalCountriesData => dispatch(
                {
                    type: "UPDATE_COUNTRIES",
                    payload: {
                        countries: finalCountriesData,
                        dataFetched: true
                    }
                }
            ))
            .catch(err => dispatch(
                {
                    type: "ERROR",
                    payload: {
                        error: err
                    }
                }
            ))
    }
}

export function updateColorGradient(dispatch, countries, criteria) {
    // Get the numerical values of all countries
    let values = Object.values(countries)
        .map(data => data[criteria])
        .filter(n => !isNaN(n));
    // Calculate minValue
    let minValue = Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(Math.min(...values))
    // Calculate maxValue
    let maxValue = Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(Math.max(...values))
    dispatch({
        type: "UPDATE_ALL_COLOR_VALUES",
        payload: {
            maxValue: maxValue,
            minValue: minValue,
            order: CriteriaOrder[criteria]
        }
    });
}

function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}
