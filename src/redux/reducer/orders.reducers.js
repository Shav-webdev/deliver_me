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
} from '../action/constants'

const initialState = {
  gettingAllOrders: false,
  allOrdersData: [],
  gettingUserOrders: false,
  userOrdersData: [],
  gettingCompanyOrders: false,
  companyOrdersData: [],
}

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY_ALL_ORDERS_REQUEST:
      return {
        ...state,
        gettingCompanyOrders: true,
      }
    case GET_COMPANY_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        gettingCompanyOrders: false,
        companyOrdersData: action.payload,
      }
    case GET_COMPANY_ALL_ORDERS_FAILURE:
      return {
        ...state,
        gettingCompanyOrders: false,
      }

    case GET_ALL_ORDERS_REQUEST:
      return {
        ...state,
        gettingAllOrders: true,
      }
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        gettingAllOrders: false,
        orderData: action.payload,
      }
    case GET_ALL_ORDERS_FAILURE:
      return {
        ...state,
        gettingAllOrders: false,
      }

    case GET_USER_ORDERS_REQUEST:
      return {
        ...state,
        gettingUserOrders: true,
      }
    case GET_USER_ORDERS_SUCCESS:
      return {
        ...state,
        gettingUserOrders: false,
        userOrdersData: action.payload,
      }
    case GET_USER_ORDERS_FAILURE:
      return {
        ...state,
        gettingUserOrders: false,
      }

    case CREATE_ORDER_REQUEST:
      return {
        ...state,
      }
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        companyOrdersData: [...state.companyOrdersData, action.payload],
      }
    case CREATE_ORDER_FAILURE:
      return {
        ...state,
      }

    case EDIT_ORDER_REQUEST:
      return {
        ...state,
      }
    case EDIT_ORDER_SUCCESS:
      const lastData = state.companyOrdersData.filter(
        elem => elem.id !== action.payload.id
      )
      return {
        ...state,
        companyOrdersData: [...lastData, action.payload],
      }
    case EDIT_ORDER_FAILURE:
      return {
        ...state,
      }

    case REMOVE_ORDER_REQUEST:
      return {
        ...state,
      }
    case REMOVE_ORDER_SUCCESS:
      const filtered = state.companyOrdersData.filter(
        elem => elem.id !== action.payload
      )
      return {
        ...state,
        companyOrdersData: [...filtered],
      }
    case REMOVE_ORDER_FAILURE:
      return {
        ...state,
      }

    default:
      return state
  }
}
