const initialState = {
    cities: [],
    cityData: {},
    citesFetched: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_CITIES":
            return {
                ...state,
                cities: action.payload.cities
            }
        default :
            return state
    }
}

export default reducer;