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
  getCompanyAllOrdersRequest,
  getCompanyAllOrdersSuccess,
  getCompanyAllOrdersFailure,
} from '../action'
import {
  errorMessage,
  successMessage,
} from '../../pages/registration/services/services'

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
        errorMessage('Cannot update Company')
        throw new Error('Cannot update Company')
      }
      dispatch(editCompanySuccsess(response.data))
      successMessage('Data successfully updated !')
    } else {
      const response = await api.companies.post({
        ...data,
      })
      dispatch(createCompanySuccsess(response.data))
      dispatch(getCompaniesThunk())
      if (response.status !== 201) {
        errorMessage('Cannot create Company')
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

export const createOrderThunk = data => async dispatch => {
  try {
    dispatch(createOrderRequest())
    const response = await api.createOrder.post(data)
    console.log('createOrderThunk', response)
    if (response.status > 300) {
      errorMessage('Something went wrong, try again')
      throw new Error('Something went wrong, try again')
    }
    dispatch(createOrderSuccsess(response.data))
    successMessage('Order successfully created !')
  } catch (error) {
    console.log(error)
    dispatch(createOrderFailure())
  }
}

export const getCompanyByIdThunk = id => async dispatch => {
  try {
    dispatch(signInAsCompanyRequest())
    const response = await api.getCompanyById(id).get(id)

    if (response.status > 300) {
      errorMessage('Something went wrong, try again')
      throw new Error('Something went wrong, try again')
    }
    dispatch(signInAsCompanySuccess(response.data))
    successMessage(`Dear ${response.data.name}, nice to see you again`)
  } catch (error) {
    console.log(error)
    dispatch(signInAsCompanyFailure())
  }
}

export const getCompanyAllOrdersThunk = id => async dispatch => {
  console.log(id)
  try {
    dispatch(getCompanyAllOrdersRequest())
    const response = await api.getCompanyOrders(id).get(id)
    console.log('getCompanyAllOrdersThunk', response)
    if (response.status > 300) {
      throw new Error('Something went wrong, try again')
    }
    console.log(response.data)
    dispatch(getCompanyAllOrdersSuccess(response.data))
    successMessage('Orders loaded...')
  } catch (error) {
    console.log(error)
    dispatch(getCompanyAllOrdersFailure())
  }
}
