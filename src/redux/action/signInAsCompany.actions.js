import {
  SIGN_IN_AS_COMPANY_REQUEST,
  SIGN_IN_AS_COMPANY_SUCCESS,
  SIGN_IN_AS_COMPANY_FAILURE,
} from './constants'

export const signInAsCompanyRequest = () => ({
  type: SIGN_IN_AS_COMPANY_REQUEST,
})
export const signInAsCompanySuccess = data => ({
  type: SIGN_IN_AS_COMPANY_SUCCESS,
  payload: data,
})
export const signInAsCompanyFailure = () => ({
  type: SIGN_IN_AS_COMPANY_FAILURE,
})
