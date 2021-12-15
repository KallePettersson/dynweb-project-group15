const initialState = {
    countries: {}
}

const reducer = (state = initialState, action) => {
    if (action.type === "GET_COUNTRIES") {
        return {
            ...state,
            countries: action.payload.countries
        }
    }
    return state
}

export default reducer;