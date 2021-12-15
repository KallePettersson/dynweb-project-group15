const initialState = {
    country: null,
    city: null,
    criteria: null,
}

const reducer = (state = initialState, action) => {
    if (action.type === "SELECT_COUNTRY") {
        return {
            ...state,
            country: action.payload.country
        }
    } else if (action.type === "SELECT_CITY") {
        return {
            ...state,
            city: action.payload.city
        }
    }else if (action.type === "SELECT_CRITERIA") {
        return {
            ...state,
            criteria: action.payload.criteria
        }
    }
    return state
}

export default reducer;