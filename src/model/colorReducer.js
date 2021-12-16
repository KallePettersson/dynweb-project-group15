const initialState = {
    order: "ascending", //Ascending means higher is better
    maxValue: 100,
    minValue: 0
}

const reducer = (state = initialState, action) => {
    if (action.type === "SET_ORDER") {
        return {
            ...state,
            order: action.payload.order
        }
    }else if (action.type === "UPDATE_MAX_VALUE") {
        return {
            ...state,
            maxValue: action.payload.maxValue
        }
    }else if (action.type === "UPDATE_MIN_VALUE") {
        return {
            ...state,
            minValue: action.payload.minValue
        }
    }
    return state
}
export default reducer;