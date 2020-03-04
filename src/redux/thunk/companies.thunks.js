import api from '../API'
import {
  getCompaniesRequest,
  getCompaniesSuccsess,
  getCompaniesFailure,
  createCompanySuccsess,
  editCompanySuccsess,
  removeCompanyFailure,
  removeCompanySuccsess,
  createOrderRequest,
  createOrderSuccsess,
  createOrderFailure,
  signInAsCompanyRequest,
  signInAsCompanySuccess,
  signInAsCompanyFailure,
} from '../action'

export const getCompaniesThunk = () => async dispatch => {
  try {
    dispatch(getCompaniesRequest())
    const response = await api.companies.get()
    if (response.status !== 200) {
      throw new Error('Cannot get Companies')
    }
    dispatch(getCompaniesSuccsess(response.data))
  } catch (error) {
    dispatch(getCompaniesFailure())
  }
}

export const createCompanyThunk = data => async dispatch => {
  try {
    if (data.id) {
      const response = await api.deleteUpdateCompany(data.id).put({ ...data })
      if (response.status !== 201) {
        throw new Error('Cannot update Company')
      }
      dispatch(editCompanySuccsess(response.data))
    } else {
      const response = await api.companies.post({
        ...data,
      })
      dispatch(createCompanySuccsess(response.data))
      dispatch(getCompaniesThunk())
      if (response.status !== 201) {
        throw new Error('Cannot create Company')
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const removeCompanyThunk = id => async dispatch => {
  try {
    await api.deleteUpdateCompany(id).delete()
    dispatch(removeCompanySuccsess(id))
    dispatch(getCompaniesThunk())
  } catch (error) {
    dispatch(removeCompanyFailure())
  }
}

export const createOrder = data => async dispatch => {
  try {
    dispatch(createOrderRequest())
    const response = await api.createOrder.post(data)
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again')
    }
    dispatch(createOrderSuccsess(response.data))
  } catch (error) {
    dispatch(createOrderFailure())
  }
}

export const getCompanyByIdThunk = id => async dispatch => {
  try {
    dispatch(signInAsCompanyRequest())
    const response = await api.getCompanyById(id).get(id)
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again')
    }
    dispatch(signInAsCompanySuccess(response.data))
  } catch (error) {
    dispatch(signInAsCompanyFailure())
  }
}
