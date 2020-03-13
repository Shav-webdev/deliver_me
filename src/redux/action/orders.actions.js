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
  GET_COMPANY_ACTIVE_ORDERS_REQUEST,
  GET_COMPANY_ACTIVE_ORDERS_SUCCESS,
  GET_COMPANY_ACTIVE_ORDERS_FAILURE,
  GET_COMPANY_PENDING_ORDERS_REQUEST,
  GET_COMPANY_PENDING_ORDERS_SUCCESS,
  GET_COMPANY_PENDING_ORDERS_FAILURE,
  GET_COMPANY_DONE_ORDERS_REQUEST,
  GET_COMPANY_DONE_ORDERS_SUCCESS,
  GET_COMPANY_DONE_ORDERS_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAILURE,
  GET_COMPANY_MORE_ALL_ORDERS_SUCCESS,
  GET_COMPANY_MORE_ALL_ORDERS_FAILURE,
  GET_COMPANY_MORE_ACTIVE_ORDERS_SUCCESS,
  GET_COMPANY_MORE_ACTIVE_ORDERS_FAILURE,
  GET_COMPANY_MORE_PENDING_ORDERS_SUCCESS,
  GET_COMPANY_MORE_PENDING_ORDERS_FAILURE,
  GET_COMPANY_MORE_DONE_ORDERS_SUCCESS,
  GET_COMPANY_MORE_DONE_ORDERS_FAILURE,
  GET_USER_DONE_ORDERS_REQUEST,
  GET_USER_DONE_ORDERS_SUCCESS,
  GET_USER_DONE_ORDERS_FAILURE,
  GET_USER_PENDING_ORDERS_REQUEST,
  GET_USER_PENDING_ORDERS_SUCCESS,
  GET_USER_PENDING_ORDERS_FAILURE,
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

export const takeOrderSuccess = data => ({
  type: 'TAKE_ORDER_SUCCESS',
  payload: data,
})
export const doneOrderSuccess = data => ({
  type: 'DONE_ORDER_SUCCESS',
  payload: data,
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

export const getActiveOrdersRequest = () => ({
  type: GET_COMPANY_ACTIVE_ORDERS_REQUEST,
})
export const getActiveOrdersSuccess = data => ({
  type: GET_COMPANY_ACTIVE_ORDERS_SUCCESS,
  payload: data,
})
export const getActiveOrdersFailure = () => ({
  type: GET_COMPANY_ACTIVE_ORDERS_FAILURE,
})

export const getDoneOrdersRequest = () => ({
  type: GET_COMPANY_DONE_ORDERS_REQUEST,
})
export const getDoneOrdersSuccess = data => ({
  type: GET_COMPANY_DONE_ORDERS_SUCCESS,
  payload: data,
})
export const getDoneOrdersFailure = () => ({
  type: GET_COMPANY_DONE_ORDERS_FAILURE,
})

export const getPendingOrdersRequest = () => ({
  type: GET_COMPANY_PENDING_ORDERS_REQUEST,
})
export const getPendingOrdersSuccess = data => ({
  type: GET_COMPANY_PENDING_ORDERS_SUCCESS,
  payload: data,
})
export const getPendingOrdersFailure = () => ({
  type: GET_COMPANY_PENDING_ORDERS_FAILURE,
})

export const getMoreAllOrdersSuccess = () => ({
  type: GET_COMPANY_MORE_ALL_ORDERS_SUCCESS,
})
export const getMoreAllOrdersFailure = () => ({
  type: GET_COMPANY_MORE_ALL_ORDERS_FAILURE,
})

export const getMoreActiveOrdersSuccess = () => ({
  type: GET_COMPANY_MORE_ACTIVE_ORDERS_SUCCESS,
})
export const getMoreActiveOrdersFailure = () => ({
  type: GET_COMPANY_MORE_ACTIVE_ORDERS_FAILURE,
})

export const getMorePendingOrdersSuccess = () => ({
  type: GET_COMPANY_MORE_PENDING_ORDERS_SUCCESS,
})
export const getMorePendingOrdersFailure = () => ({
  type: GET_COMPANY_MORE_PENDING_ORDERS_FAILURE,
})

export const getMoreDoneOrdersSuccess = () => ({
  type: GET_COMPANY_MORE_DONE_ORDERS_SUCCESS,
})
export const getMoreDoneOrdersFailure = () => ({
  type: GET_COMPANY_MORE_DONE_ORDERS_FAILURE,
})
export const getDoneUserOrdersRequest = () => ({
  type: GET_USER_DONE_ORDERS_REQUEST,
})
export const getDoneUserOrdersSuccess = data => ({
  type: GET_USER_DONE_ORDERS_SUCCESS,
  payload: data,
})
export const getDoneUserOrdersFailure = () => ({
  type: GET_USER_DONE_ORDERS_FAILURE,
})

export const getPendingUserOrdersRequest = () => ({
  type: GET_USER_PENDING_ORDERS_REQUEST,
})
export const getPendingUserOrdersSuccess = data => ({
  type: GET_USER_PENDING_ORDERS_SUCCESS,
  payload: data,
})
export const getPendingUserOrdersFailure = () => ({
  type: GET_USER_PENDING_ORDERS_FAILURE,
})
