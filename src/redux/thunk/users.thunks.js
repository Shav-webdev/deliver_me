import api from '../API'
import {
  getUsersRequest,
  getUsersSuccsess,
  getUsersFailure,
  createUserSuccsess,
  editUserSuccsess,
  removeUserFailure,
  removeUserSuccsess,
  addUserSocketSuccsess,
  getMoreUsersFailure,
  getMoreUsersRequest,
  getMoreUsersSuccsess,
  signInCurrentUserSuccess,
  noMoreUsersGet,
} from '../action'
import { errorMessage, successMessage } from '../../services/services'

export const getUsersThunk = (last, count) => async dispatch => {
  try {
    dispatch(getUsersRequest())
    const response = await api.users(last, count).get()
    if (response.status !== 200) {
      throw new Error(response.data.message)
    }
    dispatch(getUsersSuccsess(response.data))
  } catch (error) {
    const err = {
      ...error,
    }
    dispatch(getUsersFailure())
    errorMessage(err.response.data.message)
  }
}
export const getMoreUsersThunk = (last, count) => async dispatch => {
  try {
    dispatch(getMoreUsersRequest())
    if (last) {
      const response = await api.users(last, count).get()
      if (response.status !== 206) {
        dispatch(getMoreUsersSuccsess(response.data))
      } else {
        console.log('no data')
        dispatch(noMoreUsersGet())
      }
    }
  } catch (error) {
    const err = {
      ...error,
    }
    dispatch(noMoreUsersGet())
  }
}
export const addUserBySocketThunk = data => async dispatch => {
  try {
    dispatch(addUserSocketSuccsess(data))
  } catch (err) {
    console.log(err)
  }
}

export const createUserThunk = data => async dispatch => {
  try {
    if (data.id) {
      const response = await api.deleteUpdateUser(data.id).put({
        ...data,
      })
      if (response.status !== 201) {
        throw new Error(response.data.message)
      }
      dispatch(editUserSuccsess(response.data))
      successMessage('Data successfully updated !')
    } else {
      const response = await api.users.post({
        ...data,
      })
      dispatch(createUserSuccsess(response.data))
      successMessage('Data successfully created !')
      dispatch(getUsersThunk(Date.now(),8))
      if (response.status !== 201) {
        throw new Error(response.data.message)
      }
    }
  } catch (error) {
    const err = {
      ...error,
    }
    errorMessage(err.response.data.message)
  }
}

export const removeUserThunk = id => async dispatch => {
  try {
    await api.deleteUpdateUser(id).delete()
    dispatch(removeUserSuccsess(id))
    dispatch(getUsersThunk(Date.now(),8))
  } catch (error) {
    const err = {
      ...error,
    }
    dispatch(removeUserFailure())
    errorMessage(err.response.data.message)
  }
}


export const getUserByIdThunk = id => async dispatch => {
  try {    
    const response = await api.getUserById(id).get()
    dispatch(signInCurrentUserSuccess(response.data))
   // successMessage(`Dear ${response.data.name}, nice to see you again`)
  } catch (error) {
    errorMessage('Something went wrong, try again')
  }
}
