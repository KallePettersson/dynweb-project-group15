import {createStore} from "redux";
import rootReducer from "./model/rootRedux";

const store = createStore(rootReducer);

export default store;