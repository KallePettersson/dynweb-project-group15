import selectorReducer from "./selectorReducer";
import countriesReducer from "./countriesReducer";
import citiesReducer from "./citiesReducer";
import mapReducer from "./mapReducer";
import colorReducer from "./colorReducer";

// const rootReducer = combineReducers({
//     selectorReducer,
//     countriesReducer,
//     citiesReducer,
//     mapReducer,
//     colorReducer
// });

export default (state = {}, action) => {
    return {
        selectorReducer: selectorReducer(state.selectorReducer, action, state),
        countriesReducer:countriesReducer(state.countriesReducer, action, state),
        citiesReducer:citiesReducer(state.citiesReducer, action, state),
        mapReducer:mapReducer(state.mapReducer, action, state),
        colorReducer: colorReducer(state.colorReducer, action, state),
    };
};
// export default rootReducer;