import selectorReducer from "./selectorReducer";
import countriesReducer from "./countriesReducer";
import citiesReducer from "./citiesReducer";
import mapReducer from "./mapReducer";
import colorReducer from "./colorReducer";

function rootReducer(state = {}, action) {
    return {
        selectorReducer: selectorReducer(state.selectorReducer, action),
        countriesReducer: countriesReducer(state.countriesReducer, action),
        citiesReducer: citiesReducer(state.citiesReducer, action),
        mapReducer: mapReducer(state.mapReducer, action, state),
        colorReducer: colorReducer(state.colorReducer, action),
    };
}

export default rootReducer;