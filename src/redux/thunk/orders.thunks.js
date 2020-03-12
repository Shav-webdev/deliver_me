import api from '../API'
import { ACTIVE, PENDING, ALL, DONE } from '../action/constants'
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
  getActiveOrdersRequest,
  getActiveOrdersSuccess,
  getActiveOrdersFailure,
  getDoneOrdersRequest,
  getDoneOrdersSuccess,
  getDoneOrdersFailure,
  getPendingOrdersRequest,
  getPendingOrdersSuccess,
  getPendingOrdersFailure,
  takeOrderSuccess,
  addOrderBySocketRequest,
  addOrderBySocketSuccsess,
  addOrderBySocketFailure,
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

export const updateOrderByUserThunk = data => async dispatch => {
  try {
    const response = await api.deleteUpdateOrder(data.id).put({ ...data })
    console.log(response)
    if (response.status !== 201) {
      errorMessage('Cannot update Order')
    }
    dispatch(takeOrderSuccess(data))
    successMessage('Order taken.')
    //getAllOrdersThunk()
  } catch (error) {
    errorMessage('Something went wrong, please try later')
  }
}

export const getUserOrdersThunk = (id, type) => async dispatch => {
  // try {
  //   dispatch(getUserOrdersRequest())
  //   console.log('getUserordersALL')
  //   const response = await api.getUserOrders(id).get()
  //   console.log(response)
  //   if (response.status !== 200) {
  //     errorMessage('Cannot get Orders')
  //     throw new Error('Cannot get Orders')
  //   }
  //   dispatch(getUserOrdersSuccess(response.data))
  // } catch (error) {
  //   dispatch(getUserOrdersFailure())
  // }
  try {
    switch (type) {
      case ACTIVE:
        dispatch(getActiveOrdersRequest())
        const responseActive = await api.getUserOrders(id, type).get()
        dispatch(getAllOrdersSuccess(responseActive.data))
        successMessage('Active orders loaded soccessfully.')
        break
      case DONE:
        dispatch(getDoneOrdersRequest())
        const responseDone = await api.getCompanyOrders(id, type).get()
        dispatch(getDoneOrdersSuccess(responseDone.data))
        successMessage('Completed orders loaded soccessfully.')
        break
      case PENDING:
        dispatch(getPendingOrdersRequest())
        const responsePending = await api
          .getCompanyOrders(id)
          .get({ params: { type } })
        dispatch(getPendingOrdersSuccess(responsePending.data))
        successMessage('Pending orders loaded soccessfully.')
        break
    }
  } catch (error) {
    switch (type) {
      case ALL:
        dispatch(getCompanyOrdersFailure())
        errorMessage('Cannot get Orders')
        break
      case ACTIVE:
        dispatch(getActiveOrdersFailure())
        errorMessage('Cannot get active orders')
        break
      case DONE:
        dispatch(getDoneOrdersFailure())
        errorMessage('Cannot get completed orders')
        break
      case PENDING:
        dispatch(getPendingOrdersFailure())
        errorMessage('Cannot get pending orders')
        break
    }
  }
}

export const getCompanyOrdersThunk = (id, type) => async dispatch => {
  try {
    switch (type) {
      case ALL:
        dispatch(getCompanyOrdersRequest())
        const responseAll = await api
          .getCompanyOrders(id)
          .get({ params: { type } })
        dispatch(getCompanyOrdersSuccess(responseAll.data))
        successMessage('Orders loaded soccessfully.')
        break
      case ACTIVE:
        dispatch(getActiveOrdersRequest())
        const responseActive = await api
          .getCompanyOrders(id)
          .get({ params: { type } })
        dispatch(getActiveOrdersSuccess(responseActive.data))
        successMessage('Active orders loaded soccessfully.')
        break
      case DONE:
        dispatch(getDoneOrdersRequest())
        const responseDone = await api
          .getCompanyOrders(id)
          .get({ params: { type } })
        dispatch(getDoneOrdersSuccess(responseDone.data))
        successMessage('Completed orders loaded soccessfully.')
        break
      case PENDING:
        dispatch(getPendingOrdersRequest())
        const responsePending = await api
          .getCompanyOrders(id)
          .get({ params: { type } })
        dispatch(getPendingOrdersSuccess(responsePending.data))
        successMessage('Pending orders loaded soccessfully.')
        break
    }
  } catch (error) {
    switch (type) {
      case ALL:
        dispatch(getCompanyOrdersFailure())
        errorMessage('Cannot get Orders')
        break
      case ACTIVE:
        dispatch(getActiveOrdersFailure())
        errorMessage('Cannot get active orders')
        break
      case DONE:
        dispatch(getDoneOrdersFailure())
        errorMessage('Cannot get completed orders')
        break
      case PENDING:
        dispatch(getPendingOrdersFailure())
        errorMessage('Cannot get pending orders')
        break
    }
  }
}

export const createCompanyOrderThunk = data => async dispatch => {
  try {
    if (data.id) {
      console.log(data)
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
