import {
  SIGN_IN_AS_COMPANY_REQUEST,
  SIGN_IN_AS_COMPANY_SUCCESS,
  SIGN_IN_AS_COMPANY_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
} from '../action/constants'

const initialState = {
  gettingCompanies: false,
  companiesData: [],
  signInLoading: false,
  signInAsCompanyData: {},
  createOrderLoading: false,
  orderData: {},
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
        editData: [...lastData, action.payload],
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
      console.log('action', action.payload)
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
    default:
      return state
  }
}
