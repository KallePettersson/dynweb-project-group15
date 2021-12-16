const initialState = {
    cities: []
}

const reducer = (state = initialState, action) => {
    if (action.type === "UPDATE_CITIES") {
        return {
            ...state,
            cities: action.payload.cities
        }
    }
    return state
}

export default reducer;