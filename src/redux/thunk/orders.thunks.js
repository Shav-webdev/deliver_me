import api from '../API'
import {
  createOrderSuccess,
  getCompanyOrdersRequest,
  getCompanyOrdersSuccess,
  getCompanyOrdersFailure,
  editOrderSuccess,
  removeOrderSuccess,
  removeOrderFailure,
  getUserOrdersRequest,
  getUserOrdersSuccess,
  getUserOrdersFailure,
  getAllOrdersRequest,
  getAllOrdersSuccess,
  getAllOrdersFailure,
} from '../action'

import { errorMessage, successMessage } from '../../services/services'

export const getAllOrdersThunk = () => async dispatch => {
  try {
    dispatch(getAllOrdersRequest())
    const response = await api.getAllActiveOrders.get()
    if (response.status !== 200) {
      errorMessage('Cannot get active Orders')
      throw new Error('Cannot get active Orders')
    }
    dispatch(getAllOrdersSuccess(response.data))
  } catch (error) {
    dispatch(getAllOrdersFailure())
  }
}

export const getUserOrdersThunk = (id) => async dispatch => {
  try {
    dispatch(getUserOrdersRequest())
    console.log('getUserordersALL')
    const response = await api.getUserOrders(id).get()
    console.log(response)
    if (response.status !== 200) {
      errorMessage('Cannot get Orders')
      throw new Error('Cannot get Orders')
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
  try {
    if (data.id) {
      const response = await api.deleteUpdateOrder(data.id).put({ ...data })
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
    errorMessage('Something went wrong, plese try letter')
  }
}

export const removeCompanyOrderThunk = (
  companyId,
  orderId
) => async dispatch => {
  try {
    await api.deleteUpdateOrder(orderId).delete()
    dispatch(removeOrderSuccess(orderId))
    dispatch(getCompanyOrdersThunk(companyId))
    successMessage('Order deleted.')
  } catch (error) {
    dispatch(removeOrderFailure())
    errorMessage('Something went wrong.')
  }
}
