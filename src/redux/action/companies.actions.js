import {
  GET_COMPANIES_REQUEST,
  GET_COMPANIES_SUCCSESS,
  GET_COMPANIES_FAILURE,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCSESS,
  CREATE_COMPANY_FAILURE,
  REMOVE_COMPANY_REQUEST,
  REMOVE_COMPANY_SUCCSESS,
  REMOVE_COMPANY_FAILURE,
  EDIT_COMPANY_REQUEST,
  EDIT_COMPANY_SUCCSESS,
  EDIT_COMPANY_FAILURE
} from "./constants";


export const getCompaniesRequest = () => ({
    type: GET_COMPANIES_REQUEST
  })
  export const getCompaniesSuccsess = (data) => ({
    type: GET_COMPANIES_SUCCSESS,
    payload: data
  })
  export const getCompaniesFailure = () => ({
    type: GET_COMPANIES_FAILURE
  })

  export const createCompanyRequest = () => ({
    type: CREATE_COMPANY_REQUEST
  })
  export const createCompanySuccsess = (data) => ({
    type: CREATE_COMPANY_SUCCSESS,
    payload: data
  })
  export const createCompanyFailure = () => ({
    type: CREATE_COMPANY_FAILURE
  })

  export const removeCompanyRequest = () => ({
    type: REMOVE_COMPANY_REQUEST
  })
  export const removeCompanySuccsess = (data) => ({
    type: REMOVE_COMPANY_SUCCSESS,
    payload: data
  })
  export const removeCompanyFailure = () => ({
    type: REMOVE_COMPANY_FAILURE
  })

  export const editCompanyRequest = () => ({
    type: EDIT_COMPANY_REQUEST
  })
  export const editCompanySuccsess = (data) => ({
    type: EDIT_COMPANY_SUCCSESS,
    payload: data
  })
  export const editCompanyFailure = () => ({
    type: EDIT_COMPANY_FAILURE
  })