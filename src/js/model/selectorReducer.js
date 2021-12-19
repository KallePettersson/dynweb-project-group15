const initialState = {
    country: "World",
    city: null,
    criteria: "health_care_index",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case"SELECT_COUNTRY":
            return {
                ...state,
                country: action.payload.country
            }
        case "SELECT_CITY":
            return {
                ...state,
                city: action.payload.city
            }
        case "SELECT_CRITERIA":
            return {
                ...state,
                criteria: action.payload.criteria
            }
        default:
            return state
    }
}

export default reducer;