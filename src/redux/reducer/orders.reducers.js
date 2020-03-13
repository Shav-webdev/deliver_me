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
  ADD_ORDER_BY_SOCKET_REQUEST,
  ADD_ORDER_BY_SOCKET_SUCCESS,
  ADD_ORDER_BY_SOCKET_FAILURE,
  GET_COMPANY_MORE_ALL_ORDERS_SUCCESS,
  GET_COMPANY_MORE_ALL_ORDERS_FAILURE,
  GET_COMPANY_MORE_ACTIVE_ORDERS_SUCCESS,
  GET_COMPANY_MORE_ACTIVE_ORDERS_FAILURE,
  GET_COMPANY_MORE_PENDING_ORDERS_SUCCESS,
  GET_COMPANY_MORE_PENDING_ORDERS_FAILURE,
  GET_COMPANY_MORE_DONE_ORDERS_SUCCESS,
  GET_COMPANY_MORE_DONE_ORDERS_FAILURE,
  GET_USER_PENDING_ORDERS_REQUEST,
  GET_USER_PENDING_ORDERS_SUCCESS,
  GET_USER_PENDING_ORDERS_FAILURE,
  GET_USER_DONE_ORDERS_REQUEST,
  GET_USER_DONE_ORDERS_SUCCESS,
  GET_USER_DONE_ORDERS_FAILURE,
} from '../action/constants'

const initialState = {
  gettingAllOrders: false,
  allOrdersData: [],
  gettingUserOrders: false,
  userOrdersData: [],
  gettingCompanyOrders: false,
  companyOrdersData: [],
  hasMoreAllOrder: true,
  gettingCompanyActiveOrders: false,
  companyActiveOrdersData: [],
  hasMoreActiveOrder: true,
  gettingCompanyDoneOrders: false,
  companyDoneOrdersData: [],
  hasMoreDoneOrder: true,
  gettingCompanyPendingOrders: false,
  companyPendingOrdersData: [],
  hasMorePendingOrder: true,
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
        companyOrdersData: [...state.companyOrdersData, ...action.payload],
      }
    case GET_COMPANY_ALL_ORDERS_FAILURE:
      return {
        ...state,
        gettingCompanyOrders: false,
      }

    case GET_COMPANY_MORE_ALL_ORDERS_FAILURE:
      return {
        ...state,
        hasMoreAllOrder: true,
      }
    case GET_COMPANY_MORE_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        hasMoreAllOrder: false,
      }

    case GET_COMPANY_MORE_ACTIVE_ORDERS_FAILURE:
      return {
        ...state,
        hasMoreActiveOrder: true,
      }
    case GET_COMPANY_MORE_ACTIVE_ORDERS_SUCCESS:
      return {
        ...state,
        hasMoreActiveOrder: false,
      }

    case GET_COMPANY_MORE_PENDING_ORDERS_FAILURE:
      return {
        ...state,
        hasMorePendingOrder: true,
      }
    case GET_COMPANY_MORE_PENDING_ORDERS_SUCCESS:
      return {
        ...state,
        hasMorePendingOrder: false,
      }

    case GET_COMPANY_MORE_DONE_ORDERS_FAILURE:
      return {
        ...state,
        hasMoreDoneOrder: true,
      }
    case GET_COMPANY_MORE_DONE_ORDERS_SUCCESS:
      return {
        ...state,
        hasMoreDoneOrder: false,
      }

    case GET_COMPANY_DONE_ORDERS_REQUEST:
      return {
        ...state,
        gettingCompanyDoneOrders: true,
      }
    case GET_COMPANY_DONE_ORDERS_SUCCESS:
      return {
        ...state,
        gettingCompanyDoneOrders: false,
        companyDoneOrdersData: [
          ...state.companyDoneOrdersData,
          ...action.payload,
        ],
      }
    case GET_COMPANY_DONE_ORDERS_FAILURE:
      return {
        ...state,
        gettingCompanyDoneOrders: false,
      }

    case GET_COMPANY_PENDING_ORDERS_REQUEST:
      return {
        ...state,
        gettingCompanyPendingOrders: true,
      }
    case GET_COMPANY_PENDING_ORDERS_SUCCESS:
      return {
        ...state,
        gettingCompanyPendingOrders: false,
        companyPendingOrdersData: [
          ...state.companyPendingOrdersData,
          ...action.payload,
        ],
      }
    case GET_COMPANY_PENDING_ORDERS_FAILURE:
      return {
        ...state,
        gettingCompanyPendingOrders: false,
      }

    case GET_COMPANY_ACTIVE_ORDERS_REQUEST:
      return {
        ...state,
        gettingCompanyActiveOrders: true,
      }
    case GET_COMPANY_ACTIVE_ORDERS_SUCCESS:
      return {
        ...state,
        gettingCompanyActiveOrders: false,
        companyActiveOrdersData: [
          ...state.companyActiveOrdersData,
          ...action.payload,
        ],
      }
    case GET_COMPANY_ACTIVE_ORDERS_FAILURE:
      return {
        ...state,
        gettingCompanyActiveOrders: false,
      }

    case GET_USER_PENDING_ORDERS_REQUEST:
      return {
        ...state,
        gettingCompanyPendingOrders: true,
      }
    case GET_USER_PENDING_ORDERS_SUCCESS:
      return {
        ...state,
        gettingCompanyPendingOrders: false,
        companyPendingOrdersData: action.payload,
      }
    case GET_USER_PENDING_ORDERS_FAILURE:
      return {
        ...state,
        gettingCompanyPendingOrders: false,
      }

    case GET_USER_DONE_ORDERS_REQUEST:
      return {
        ...state,
        gettingCompanyDoneOrders: true,
      }
    case GET_USER_DONE_ORDERS_SUCCESS:
      return {
        ...state,
        gettingCompanyDoneOrders: false,
        companyDoneOrdersData: action.payload,
      }
    case GET_USER_DONE_ORDERS_FAILURE:
      return {
        ...state,
        gettingCompanyDoneOrders: false,
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
        allOrdersData: action.payload,
      }
    case GET_ALL_ORDERS_FAILURE:
      return {
        ...state,
        gettingAllOrders: false,
      }
    case 'DONE_ORDER_SUCCESS':
      const donOrders = state.allOrdersData.filter(
        elem => elem.id !== action.payload.id
      )
      return {
        ...state,
        companyPendingOrdersData: [...donOrders],
      }
    case 'TAKE_ORDER_SUCCESS':
      const lastOrders = state.allOrdersData.filter(
        elem => elem.id !== action.payload.id
      )
      return {
        ...state,
        allOrdersData: [...lastOrders],
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
