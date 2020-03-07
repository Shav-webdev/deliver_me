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


export const getAllOrdersThunk = () => async dispatch => {
    try {
      dispatch(getAllOrdersRequest())
      const response = await api.getAllActiveOrders.get()
      if (response.status !== 200) {
        throw new Error('Cannot get active Orders')
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
        throw new Error('Cannot get Orders')
      }
      dispatch(getUserOrdersSuccess(response.data))
    } catch (error) {
      dispatch(getUserOrdersFailure())
    }
  }

export const getCompanyOrdersThunk = () => async dispatch => {
  try {
    dispatch(getCompanyOrdersRequest())
    const response = await api.getCompanyOrders(id).get()
    if (response.status !== 200) {
      throw new Error('Cannot get Orders')
    }
    dispatch(getCompanyOrdersSuccess(response.data))
  } catch (error) {
    dispatch(getCompanyOrdersFailure())
  }
}

export const createCompanyOrderThunk = data => async dispatch => {
  try {
    if (data.id) {
      const response = await api.deleteUpdateOrder(data.id).put({ ...data })
      if (response.status !== 201) {
        throw new Error('Cannot update Order')
      }
      dispatch(editOrderSuccess(response.data))
    } else {
      const response = await api.createOrder.post({
        ...data,
      })
      dispatch(createOrderSuccess(response.data))
      dispatch(getCompanyOrdersThunk())
      if (response.status !== 201) {
        throw new Error('Cannot create Order')
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const removeCompanyOrderThunk = (id) => async (dispatch) => {
    try {
      await api.deleteUpdateOrder(id).delete();
      dispatch(removeOrderSuccess(id))
      dispatch(getCompanyOrdersThunk())
    } catch (error) {
      dispatch(removeOrderFailure());
    }
  }

  




