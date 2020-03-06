import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_COMPANY_ALL_ORDERS_REQUEST,
    GET_COMPANY_ALL_ORDERS_SUCCESS,
    GET_COMPANY_ALL_ORDERS_FAILURE,
    GET_COMPANY_ACTIVE_ORDERS_REQUEST,
    GET_COMPANY_ACTIVE_ORDERS_SUCCESS,
    GET_COMPANY_ACTIVE_ORDERS_FAILURE,
    GET_COMPANY_COMPLETED_ORDERS_REQUEST,
    GET_COMPANY_COMPLETED_ORDERS_SUCCESS,
    GET_COMPANY_COMPLETED_ORDERS_FAILURE,
    GET_USER_ALL_ORDERS_REQUEST,
    GET_USER_ALL_ORDERS_SUCCESS,
    GET_USER_ALL_ORDERS_FAILURE,
    GET_USER_ACTIVE_ORDERS_REQUEST,
    GET_USER_ACTIVE_ORDERS_SUCCESS,
    GET_USER_ACTIVE_ORDERS_FAILURE,
    GET_USER_COMPLETED_ORDERS_REQUEST,
    GET_USER_COMPLETED_ORDERS_SUCCESS,
    GET_USER_COMPLETED_ORDERS_FAILURE
} from './constants'

export const createOrderRequest = () => ({
    type: CREATE_ORDER_REQUEST,
})
export const createOrderSuccsess = data => ({
    type: CREATE_ORDER_SUCCESS,
    payload: data,
})
export const createOrderFailure = () => ({
    type: CREATE_ORDER_FAILURE,
})

export const getCompanyAllOrdersRequest = () => ({
    type: GET_COMPANY_ALL_ORDERS_REQUEST,
})
export const getCompanyAllOrdersSuccess = data => ({
    type: GET_COMPANY_ALL_ORDERS_SUCCESS,
    payload: data,
})
export const getCompanyAllOrdersFailure = () => ({
    type: GET_COMPANY_ALL_ORDERS_FAILURE,
})
export const getCompanyActiveOrdersRequest = () => ({
    type: GET_COMPANY_ACTIVE_ORDERS_REQUEST,
})
export const getCompanyActiveOrdersSuccess = data => ({
    type: GET_COMPANY_ACTIVE_ORDERS_SUCCESS,
    payload: data,
})
export const getCompanyActiveOrdersFailure = () => ({
    type: GET_COMPANY_ACTIVE_ORDERS_FAILURE,
})

export const getCompanyCompletedOrdersRequest = () => ({
    type: GET_COMPANY_COMPLETED_ORDERS_REQUEST,
})
export const getCompanyCompletedOrdersSuccess = data => ({
    type: GET_COMPANY_COMPLETED_ORDERS_SUCCESS,
    payload: data,
})
export const getCompanyCompletedOrdersFailure = () => ({
    type: GET_COMPANY_COMPLETED_ORDERS_FAILURE,
})
export const getUserAllOrdersRequest = () => ({
    type: GET_USER_ALL_ORDERS_REQUEST,
})
export const getUserAllOrdersSuccess = data => ({
    type: GET_USER_ALL_ORDERS_SUCCESS,
    payload: data,
})
export const getUserAllOrdersFailure = () => ({
    type: GET_USER_ALL_ORDERS_FAILURE,
})
export const getUserActiveOrdersRequest = () => ({
    type: GET_USER_ACTIVE_ORDERS_REQUEST,
})
export const getUserActiveOrdersSuccess = data => ({
    type: GET_USER_ACTIVE_ORDERS_SUCCESS,
    payload: data,
})
export const getUserActiveOrdersFailure = () => ({
    type: GET_USER_ACTIVE_ORDERS_FAILURE,
})
export const getUserCompletedOrdersRequest = () => ({
    type: GET_USER_COMPLETED_ORDERS_REQUEST,
})
export const getUserCompletedOrdersSuccess = data => ({
    type: GET_USER_COMPLETED_ORDERS_SUCCESS,
    payload: data,
})
export const getUserCompletedOrdersFailure = () => ({
    type: GET_USER_COMPLETED_ORDERS_FAILURE,
})