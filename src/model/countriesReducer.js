const initialState = {
    countries: {},
    dataFetched: false
}

const reducer = (state = initialState, action) => {
    if (action.type === "UPDATE_COUNTRIES") {
        return {
            ...state,
            countries: action.payload.countries,
            dataFetched: true
        }
    }
    return state
}

export default reducer;