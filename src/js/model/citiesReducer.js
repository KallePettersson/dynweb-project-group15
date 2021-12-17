const initialState = {
    cities: [],
    cityData:{},
    citesFetched: false
}

const reducer = (state = initialState, action, globalState) => {
    if (action.type === "UPDATE_CITIES") {
        return {
            ...state,
            cities: action.payload.cities
        }
    }
    return state
}

export default reducer;