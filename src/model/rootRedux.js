import {combineReducers} from "redux";
import selectorReducer from "./selectorReducer";
import countriesReducer from "./countriesReducer";
import citiesReducer from "./citiesReducer";

const rootReducer = combineReducers({
    selectorReducer,
    countriesReducer,
    citiesReducer
});

export default rootReducer;