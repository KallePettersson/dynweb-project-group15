const initialState = {
    mapLoaded: false,
    mapReference: null,
    mapZoomReference: null,
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
    } else if (action.type === "SET_MAP_REFERENCE"){
        // console.log("inside set map ref", action.payload.mapReference);
        return {
            ...state,
            mapReference: action.payload.mapReference
        }
    } else if (action.type === "SET_MAP_ZOOM_REFERENCE"){
        return {
            ...state,
            mapZoomReference: action.payload.mapZoomReference
        }
    }
    return state
}
export default reducer;