import store from "../store";
import {CriteriaOrder} from "../criteria";

function updateColorGradient() {
    let countriesData = store.getState().countriesReducer.countries;
    let selectedCriteria = store.getState().selectorReducer.criteria;
    let values = Object.values(countriesData)
        .map(data => data[selectedCriteria])
        .filter(n => !isNaN(n));
    console.log("MAX: ", Math.max(...values));
    console.log("MIN: ", Math.min(...values));

    store.dispatch({
        type: "UPDATE_MIN_VALUE",
        payload: {
            minValue: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }).format(Math.min(...values))
        }
    });
    store.dispatch({
        type: "UPDATE_MAX_VALUE",
        payload: {
            maxValue: Intl.NumberFormat("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }).format(Math.max(...values))
        }
    });
    store.dispatch({
        type: "SET_ORDER",
        payload: {
            order: CriteriaOrder[selectedCriteria]
        }
    });

}

export default updateColorGradient;