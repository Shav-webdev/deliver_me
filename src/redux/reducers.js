import { combineReducers } from 'redux'
import { } from './constants'

const initialState = {

};

function company(state = initialState, action) {
    return state;
}

function courier(state = initialState, action) {
    return state;
}

const deliveryStore = combineReducers({
    company,
    courier
});
export default deliveryStore