import {
  GET_COMPANIES_REQUEST,
  GET_COMPANIES_SUCCSESS,
  GET_COMPANIES_FAILURE,
  ADD_COMPANY_SOCKET_SUCCESS,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCSESS,
  CREATE_COMPANY_FAILURE,
  REMOVE_COMPANY_REQUEST,
  REMOVE_COMPANY_SUCCSESS,
  REMOVE_COMPANY_FAILURE,
  EDIT_COMPANY_REQUEST,
  EDIT_COMPANY_SUCCSESS,
  EDIT_COMPANY_FAILURE,
  SIGN_IN_AS_COMPANY_REQUEST,
  SIGN_IN_AS_COMPANY_SUCCESS,
  SIGN_IN_AS_COMPANY_FAILURE,
} from './constants'

export const getCompaniesRequest = () => ({
  type: GET_COMPANIES_REQUEST,
})
export const getCompaniesSuccsess = data => ({
  type: GET_COMPANIES_SUCCSESS,
  payload: data,
})
export const getCompaniesFailure = () => ({
  type: GET_COMPANIES_FAILURE,
})

export const getMoreCompanyRequest = () => ({
  type: 'GET_MORE_COMPANY_REQUEST',
})
export const getMoreCompanySuccsess = data => ({
  type: 'GET_MORE_COMPANY_SUCCSESS',
  payload: data,
})
export const getMoreCompanyFailure = () => ({
  type: 'GET_MORE_COMPANY_FAILURE',
})

export const noMoreCompanyGet = () => ({
  type: 'NO_MORE_COMPANY',
})

export const addCompanySocketSuccsess = data => ({
  type: ADD_COMPANY_SOCKET_SUCCESS,
  payload: data,
})

export const createCompanyRequest = () => ({
  type: CREATE_COMPANY_REQUEST,
})
export const createCompanySuccsess = data => ({
  type: CREATE_COMPANY_SUCCSESS,
  payload: data,
})
export const createCompanyFailure = () => ({
  type: CREATE_COMPANY_FAILURE,
})

export const removeCompanyRequest = () => ({
  type: REMOVE_COMPANY_REQUEST,
})
export const removeCompanySuccsess = data => ({
  type: REMOVE_COMPANY_SUCCSESS,
  payload: data,
})
export const removeCompanyFailure = () => ({
  type: REMOVE_COMPANY_FAILURE,
})

export const editCompanyRequest = () => ({
  type: EDIT_COMPANY_REQUEST,
})
export const editCompanySuccsess = data => ({
  type: EDIT_COMPANY_SUCCSESS,
  payload: data,
})
export const editCompanyFailure = () => ({
  type: EDIT_COMPANY_FAILURE,
})

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
