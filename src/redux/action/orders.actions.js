import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    EDIT_ORDER_REQUEST,
    EDIT_ORDER_SUCCESS,
    EDIT_ORDER_FAILURE,
    REMOVE_ORDER_REQUEST,
    REMOVE_ORDER_SUCCESS,
    REMOVE_ORDER_FAILURE,
    GET_COMPANY_ALL_ORDERS_REQUEST,
    GET_COMPANY_ALL_ORDERS_SUCCESS,
    GET_COMPANY_ALL_ORDERS_FAILURE,
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAILURE,
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAILURE,
} from './constants'

export const getCompanyOrdersRequest = () => ({
    type: GET_COMPANY_ALL_ORDERS_REQUEST,
  })
  export const getCompanyOrdersSuccess = data => ({
    type: GET_COMPANY_ALL_ORDERS_SUCCESS,
    payload: data,
  })
  export const getCompanyOrdersFailure = () => ({
    type: GET_COMPANY_ALL_ORDERS_FAILURE,
  })

export const createOrderRequest = () => ({
    type: CREATE_ORDER_REQUEST,
})
export const createOrderSuccess = data => ({
    type: CREATE_ORDER_SUCCESS,
    payload: data,
})
export const createOrderFailure = () => ({
    type: CREATE_ORDER_FAILURE,
})

export const editOrderRequest = () => ({
    type: EDIT_ORDER_REQUEST,
})
export const editOrderSuccess = data => ({
    type: EDIT_ORDER_SUCCESS,
    payload: data,
})
export const editOrderFailure = () => ({
    type: EDIT_ORDER_FAILURE,
})

export const removeOrderRequest = () => ({
    type: REMOVE_ORDER_REQUEST,
})
export const removeOrderSuccess = data => ({
    type: REMOVE_ORDER_SUCCESS,
    payload: data,
})
export const removeOrderFailure = () => ({
    type: REMOVE_ORDER_FAILURE,
})

export const getUserOrdersRequest = () => ({
    type: GET_USER_ORDERS_REQUEST,
})
export const getUserOrdersSuccess = data => ({
    type: GET_USER_ORDERS_SUCCESS,
    payload: data,
})
export const getUserOrdersFailure = () => ({
    type: GET_USER_ORDERS_FAILURE,
})

export const getAllOrdersRequest = () => ({
    type: GET_ALL_ORDERS_REQUEST,
})
export const getAllOrdersSuccess = data => ({
    type: GET_ALL_ORDERS_SUCCESS,
    payload: data,
})
export const getAllOrdersFailure = () => ({
    type: GET_ALL_ORDERS_FAILURE,
})