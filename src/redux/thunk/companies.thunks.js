import api from '../API'
import {
  getCompaniesRequest,
  getCompaniesSuccsess,
  getCompaniesFailure,
  createCompanySuccsess,
  editCompanySuccsess,
  removeCompanyFailure,
  removeCompanySuccsess,
  signInAsCompanyRequest,
  signInAsCompanySuccess,
  signInAsCompanyFailure,
  addCompanySocketSuccsess,
} from '../action'
import { errorMessage, successMessage } from '../../services/services'
import history from '../../routes/history'

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

export const addCompanyBySocketThunk = data => async dispatch => {
  try {
    dispatch(addCompanySocketSuccsess(data))
  } catch (err) {
    console.log(err)
  }
}

export const createCompanyThunk = data => async dispatch => {
  try {
    if (data.id) {
      const response = await api.deleteUpdateCompany(data.id).put({
        ...data,
      })
      if (response.status !== 201) {
        errorMessage('Cannot update Company')
        throw new Error('Cannot update Company')
      }
      dispatch(editCompanySuccsess(response.data))
      getCompanyByIdThunk(data.id)
      successMessage('Data successfully updated !')
    } else {
      const response = await api.companies.post({
        ...data,
      })
      dispatch(createCompanySuccsess(response.data))
      dispatch(getCompaniesThunk(data.id))
      if (response.status !== 201) {
        errorMessage('Cannot create Company')
        throw new Error('Cannot create Company')
      }
    }
  } catch (error) {
    const err = {
      ...error,
    }
    errorMessage(`${error.response.data.message}`)
  }
}

export const removeCompanyByIdThunk = id => async dispatch => {
  try {
    await api.deleteUpdateCompany(id).delete()
    dispatch(removeCompanySuccsess(id))
    successMessage('Account deleted.')
    history.push('/')
  } catch (error) {
    dispatch(removeCompanyFailure())
    errorMessage(`${error.response.data.message}`)
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

export const getCompanyByIdThunk = id => async dispatch => {
  try {
    dispatch(signInAsCompanyRequest())
    const response = await api.getCompanyById(id).get()
    dispatch(signInAsCompanySuccess(response.data))
    successMessage(`Dear ${response.data.name}, nice to see you again`)
  } catch (error) {
    errorMessage('Something went wrong, try again')
    dispatch(signInAsCompanyFailure())
  }
}
