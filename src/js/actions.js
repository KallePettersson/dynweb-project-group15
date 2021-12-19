import CountryCodes from "./countryCodes";
import ApiHandler from "./api-handler";
import {Criteria, CriteriaOrder} from "./criteria";
import {getColorGradient} from "./colorConfig";

// asynchronous action creator (thunk)
/**
 * A thunk that will be used to fetch data from Numbeo's API. The thunk will fetch the data and process it before
 * storing it in the Redux store.
 *
 * @returns {function(*=, *): Promise<*>} The function that will be used by the Redux-thunk library.
 */
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

/**
 * Used to update the color properties in the store. This will affect the colors of the map and the colors of
 * the color gradient. It will also affect the maximum and minimum values displayed on the color gradient.
 *
 * @param dispatch A function for dispatching data to the Redux store.
 * @param countries A dictionary for the data of all Countries available in the Redux store.
 * @param criteria A string representing the selected criteria in the selector.
 */
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

/**
 * Find the given key in an object based on its value
 * @param object
 * @param value
 * @returns {string}
 */
function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}
