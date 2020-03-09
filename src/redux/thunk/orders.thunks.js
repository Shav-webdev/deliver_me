import api from '../API'
import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  getCompanyOrdersRequest,
  getCompanyOrdersSuccess,
  getCompanyOrdersFailure,
  editOrderRequest,
  editOrderSuccess,
  editOrderFailure,
  removeOrderRequest,
  removeOrderSuccess,
  removeOrderFailure,
  getUserOrdersRequest,
  getUserOrdersSuccess,
  getUserOrdersFailure,
  getAllOrdersRequest,
  getAllOrdersSuccess,
  getAllOrdersFailure,
} from '../action'

import {
  errorMessage,
  successMessage,
} from '../../pages/registration/services/services'

export const getAllOrdersThunk = () => async dispatch => {
  try {
    dispatch(getAllOrdersRequest())
    const response = await api.getAllActiveOrders.get()
    if (response.status !== 200) {
      errorMessage('Cannot get active Orders')
    }
    dispatch(getAllOrdersSuccess(response.data))
  } catch (error) {
    dispatch(getAllOrdersFailure())
  }
}

export const getUserOrdersThunk = () => async dispatch => {
  try {
    dispatch(getUserOrdersRequest())
    const response = await api.getUserOrders(id).get()
    if (response.status !== 200) {
      errorMessage('Cannot get Orders')
    }
    dispatch(getUserOrdersSuccess(response.data))
  } catch (error) {
    dispatch(getUserOrdersFailure())
  }
}

export const getCompanyOrdersThunk = id => async dispatch => {
  try {
    dispatch(getCompanyOrdersRequest())
    const response = await api.getCompanyOrders(id).get()
    if (response.status !== 200) {
      errorMessage('Cannot get Orders')
    }
    dispatch(getCompanyOrdersSuccess(response.data))
    successMessage('Orders loaded soccessfully.')
  } catch (error) {
    dispatch(getCompanyOrdersFailure())
    errorMessage('Cannot get Orders')
  }
}

export const createCompanyOrderThunk = data => async dispatch => {
  console.log(data)
  try {
    if (data.id) {
      console.log(data)
      const response = await api.deleteUpdateOrder(data.id).put({ ...data })
      console.log(response)
      if (response.status !== 201) {
        errorMessage('Cannot update Order')
      }
      dispatch(editOrderSuccess(response.data))
      successMessage('Order updated.')
    } else {
      const response = await api.createOrder.post({
        ...data,
      })
      dispatch(createOrderSuccess(response.data))
      dispatch(getCompanyOrdersThunk(data.companyId))
      successMessage('Order created.')
      if (response.status !== 201) {
        errorMessage('Cannot create Order')
      }
    }
  } catch (error) {
    console.log(error)
    errorMessage('Something went wrong, plese try letter')
  }
}

export const removeCompanyOrderThunk = id => async dispatch => {
  try {
    const response = await api.deleteUpdateOrder(id).delete()
    dispatch(removeOrderSuccess(id))
    dispatch(getCompanyOrdersThunk())
    if (response.status === 202) {
      successMessage('Order deleted.')
    }
  } catch (error) {
    console.log(error)
    dispatch(removeOrderFailure())
    errorMessage('Something went wrong.')
  }
}
