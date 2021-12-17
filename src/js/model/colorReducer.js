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
export default reducer;