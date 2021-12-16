const initialState = {
    mapLoaded: false
}

const reducer = (state = initialState, action) => {
    if (action.type === "SET_MAP_LOADED_TRUE") {
        return {
            ...state,
            mapLoaded: true
        }
    } else if (action.type === "SET_MAP_LOADED_FALSE") {
        return {
            ...state,
            mapLoaded: false
        }
    }
    return state
}
export default reducer;