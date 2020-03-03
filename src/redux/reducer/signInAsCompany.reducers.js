import {
  SIGN_IN_AS_COMPANY_REQUEST,
  SIGN_IN_AS_COMPANY_SUCCESS,
  SIGN_IN_AS_COMPANY_FAILURE,
} from '../action/constants'

const initialState = {
  signInLoading: false,
  signInAsCompanyData: {},
}

export default function signInAsCompany(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state
  }
}
