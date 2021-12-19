const initialState = {
    countries: {},
    error: "",
    dataFetched: false,
    countryHovered: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case  "UPDATE_COUNTRIES":
            return {
                ...state,
                countries: action.payload.countries,
                dataFetched: true
            }
        case "UPDATE_COUNTRY_HOVERED" :
            return {
                ...state,
                countryHovered: action.payload.countryHovered,
            }
        case "UPDATE_DATA_FETCHED" :
            return {
                ...state,
                dataFetched: !state.dataFetched
            }
        case "ERROR" :
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default reducer;