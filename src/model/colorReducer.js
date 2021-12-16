const initialState = {
    sort: "descending",
    maxValue: 100,
    minValue: 0
}

const reducer = (state = initialState, action) => {
    if (action.type === "SET_SORT_ASCENDING") {
        return {
            ...state,
            sort: "ascending"
        }
    } else if (action.type === "SET_SORT_DESCENDING") {
        return {
            ...state,
            sort: "descending"
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