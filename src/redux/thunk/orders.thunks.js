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
      const response = await api.getUserOrders.get()
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
    const response = await api.getCompanyOrders.get()
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
      const response = await api.users.post({
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
      await api.deleteUpdateUser(id).delete();
      dispatch(removeOrderSuccess(id))
      dispatch(getCompanyOrdersThunk())
    } catch (error) {
      dispatch(removeOrderFailure());
    }
  }

  

export const getCompanyAllOrdersThunk = id => async dispatch => {
  console.log(id)
  try {
    dispatch(getCompanyAllOrdersRequest())
    const response = await api.getCompanyOrders(id).get(id)
    if (response.status > 300) {
      throw new Error('Something went wrong, try again')
    }
    console.log(response.data)
    dispatch(getCompanyAllOrdersSuccess(response.data))
  } catch (error) {
    console.log(error)
    dispatch(getCompanyAllOrdersFailure())
  }
}


