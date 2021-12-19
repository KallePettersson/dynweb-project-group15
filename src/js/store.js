import {applyMiddleware, createStore} from "redux";
import rootReducer from "./model/rootRedux";
import thunk from "redux-thunk"

const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => console.log("STATE : ", store.getState()));

export default store;