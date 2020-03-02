import {combineReducers} from 'redux'
import {
    CURRENT_COMPANY,
    CURRENT_USER,
    GET_COMPANIES,
    GET_USERS
} from "./constants";


const initialState = {
    users: {
        currentUser: {},
        allUsers: []
    },
    companies: {
        currentCompany: {},
        allCompanies: [],
    },


}

function companies(state = initialState.companies, action) {
    switch (action.type) {
        case CURRENT_COMPANY:
            console.log("hbhjb",  action.company)
            return {
                ...state,
                currentCompany: {
                    ...action.company
                }
            };
        case GET_COMPANIES:
            return {
                ...state,
                allCompanies: [
                    ...action.companies
                ]
            };
        default:
            return state;
    }
}


function users(state = initialState.users, action) {
    switch (action.type) {
        case GET_USERS:
            return [
                ...action.users
            ];
        default:
            return state;
    }
}

const deliveryStore = combineReducers({
    companies,
    users
});
export default deliveryStore