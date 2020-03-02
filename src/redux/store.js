import {createStore} from "redux";
import deliveryStore from "./reducers";

export const store = createStore(
    deliveryStore, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);