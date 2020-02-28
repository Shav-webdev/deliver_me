import { combineReducers } from 'redux'
import { } from './constants'
import {CURRENT_COMPANY} from "./constants";
import {CURRENT_USER} from "./constants";
import {GET_COMPANIES} from "./constants";
import {GET_USERS} from "./constants";

const initialState = {
    users: [],
    companies: [],
    currentUser: {

    },
    currentCompany:{

    }
}

function currentCompany(state = initialState.currentCompany, action) {
    switch (action.type) {
        case CURRENT_COMPANY:
            return {
                ...state, ...action.company
            };
        default:
            return state;
    }
}

function currentUser(state = initialState.currentUser, action) {
    switch (action.type) {
        case CURRENT_USER:
            return {
                ...state, ...action.user
            };
        default:
            return state;
    }
}

function companies(state = initialState.companies, action) {
    switch (action.type) {
        case GET_COMPANIES:
            return [
                ...state, ...action.companies
            ];
        default:
            return state;
    }
}

function users(state = initialState.users, action) {
    switch (action.type) {
        case GET_USERS:
            return [
                ...state, ...action.users
            ];
        default:
            return state;
    }
}

const deliveryStore = combineReducers({
    currentCompany,
    currentUser,
    companies,
    users
});
export default deliveryStore