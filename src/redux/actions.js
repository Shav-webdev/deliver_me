/*
 * action creators
 */

import {CURRENT_USER, CURRENT_COMPANY, GET_COMPANIES, GET_USERS, LOADING} from "./constants";

export function loading(bool) {
    return { type: LOADING, bool }
}

export function currentUser(user) {
    return { type: CURRENT_USER, user }
}

export function currentCompany(company) {
    return { type: CURRENT_COMPANY, company }
}

export function getUsers(users) {
    return { type: GET_USERS, users }
}

export function getCompanies(companies) {
    return { type: GET_COMPANIES, companies }
}

