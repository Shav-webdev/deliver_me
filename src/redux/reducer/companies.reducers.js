import {
  SIGN_IN_AS_COMPANY_REQUEST,
  SIGN_IN_AS_COMPANY_SUCCESS,
  SIGN_IN_AS_COMPANY_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_COMPANY_ALL_ORDERS_REQUEST,
  GET_COMPANY_ALL_ORDERS_SUCCESS,
  GET_COMPANY_ALL_ORDERS_FAILURE,
  ADD_COMPANY_SOCKET_SUCCESS,
} from '../action/constants'

const initialState = {
  gettingCompanies: false,
  companiesData: [],
  signInLoading: false,
  signInAsCompanyData: {},
  createOrderLoading: false,
  orderData: {},
  getingCompanyAllOrders: false,
  companyAllOrders: [],
}

export default function companiesReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_COMPANIES_REQUEST':
      return {
        ...state,
        gettingCompanies: true,
      }
    case 'GET_COMPANIES_SUCCSESS':
      return {
        ...state,
        gettingCompanies: false,
        companiesData: action.payload,
      }
    case 'GET_COMPANIES_FAILURE':
      return {
        ...state,
        gettingCompanies: false,
      }

    case ADD_COMPANY_SOCKET_SUCCESS:
      return {
        ...state,
        companiesData: [...state.companiesData, action.payload],
      }

    case 'CREATE_COMPANY_SUCCSESS':
      return {
        ...state,
        companiesData: [...state.companiesData, action.payload],
      }
    case 'CREATE_COMPANY_FAILURE':
      return {
        ...state,
      }

    case 'EDIT_COMPANY_SUCCSESS':
      const lastData = state.companiesData.filter(
        elem => elem.id !== action.payload.id
      )
      return {
        ...state,
        companiesData: [...lastData, action.payload],
      }
    case 'EDIT_COMPANY_FAILURE':
      return {
        ...state,
      }

    case 'REMOVE_COMPANY_SUCCSESS':
      const filtered = state.companiesData.filter(
        elem => elem.id !== action.payload
      )
      return {
        ...state,
        companiesData: [...filtered],
      }
    case 'REMOVE_COMPANY_FAILURE':
      return {
        ...state,
      }
    case SIGN_IN_AS_COMPANY_REQUEST:
      return {
        ...state,
        signInLoading: true,
      }
    case SIGN_IN_AS_COMPANY_SUCCESS:
      return {
        ...state,
        signInLoading: false,
        signInAsCompanyData: action.payload,
      }
    case SIGN_IN_AS_COMPANY_FAILURE:
      return {
        ...state,
        signInLoading: false,
      }
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        createOrderLoading: true,
      }
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        createOrderLoading: false,
        orderData: action.payload,
      }
    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        createOrderLoading: false,
      }

    case GET_COMPANY_ALL_ORDERS_REQUEST:
      return {
        ...state,
        getingCompanyAllOrders: true,
      }
    case GET_COMPANY_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        getingCompanyAllOrders: false,
        companyAllOrders: action.payload,
      }
    case GET_COMPANY_ALL_ORDERS_FAILURE:
      return {
        ...state,
        getingCompanyAllOrders: false,
      }
    default:
      return state
  }
}
