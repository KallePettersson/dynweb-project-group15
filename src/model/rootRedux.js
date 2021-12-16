import {combineReducers} from "redux";
import selectorReducer from "./selectorReducer";
import countriesReducer from "./countriesReducer";
import citiesReducer from "./citiesReducer";
import mapReducer from "./mapReducer";

const rootReducer = combineReducers({
    selectorReducer,
    countriesReducer,
    citiesReducer,
    mapReducer
});

export default rootReducer;