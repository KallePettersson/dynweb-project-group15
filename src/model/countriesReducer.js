const initialState = {
    countries: {},
    dataFetched: false,
    countryHovered: null
}

const reducer = (state = initialState, action) => {
    if (action.type === "UPDATE_COUNTRIES") {
        return {
            ...state,
            countries: action.payload.countries,
            dataFetched: true
        }
    } else if (action.type === "UPDATE_COUNTRY_HOVERED"){
        return {
            ...state,
            countryHovered: action.payload.countryHovered,
        }
    }
    return state
}

export default reducer;