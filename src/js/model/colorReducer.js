import {CriteriaOrder} from "../criteria";
import store from "../store";

const initialState = {
    order: "ascending", //Ascending means higher is better
    maxValue: 100,
    minValue: 0,
    // updateColorGradient: updateColorGradient,
}

const reducer = (state = initialState, action, globalState) => {
    console.log("STATE: " , store)
    if (action.type === "SET_ORDER") {
        return {
            ...state,
            order: action.payload.order
        }
    } else if (action.type === "UPDATE_MAX_VALUE") {
        return {
            ...state,
            maxValue: action.payload.maxValue
        }
    } else if (action.type === "UPDATE_MIN_VALUE") {
        return {
            ...state,
            minValue: action.payload.minValue
        }
    } else if (action.type === "UPDATE_COLOR_GRADIENT") {
        return updateColorGradient(state,globalState);
    }

    return state
}


function updateColorGradient(state,globalState) {

    let countriesData = globalState.countriesReducer.countries;
    let selectedCriteria = globalState.selectorReducer.criteria;
    let values = Object.values(countriesData)
        .map(data => data[selectedCriteria])
        .filter(n => !isNaN(n));

    let min = Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(Math.min(...values))
    let max = Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(Math.max(...values))
    return {
        ...state,
        maxValue: max,
        minValue: min,
        order: CriteriaOrder[selectedCriteria]
    }
 }

export default reducer;