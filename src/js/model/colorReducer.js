const initialState = {
    order: "ascending", //Ascending means higher is better
    maxValue: 100,
    minValue: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ORDER":
            return {
                ...state,
                order: action.payload.order
            }
        case "UPDATE_MAX_VALUE":
            return {
                ...state,
                maxValue: action.payload.maxValue
            }
        case "UPDATE_MIN_VALUE":
            return {
                ...state,
                minValue: action.payload.minValue
            }
        case "UPDATE_ALL_COLOR_VALUES":
            return {
                ...state,
                minValue: action.payload.minValue,
                maxValue: action.payload.maxValue,
                order: action.payload.order
            }
        default:
            return state
    }
}

export default reducer;