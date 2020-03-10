import api from '../API'
import {
  getUsersRequest,
  getUsersSuccsess,
  getUsersFailure,
  createUserSuccsess,
  editUserSuccsess,
  removeUserFailure,
  removeUserSuccsess,
  addUserSocketSuccsess
} from '../action'
import {
  errorMessage,
  successMessage
} from '../../services/services'

export const getUsersThunk = () => async dispatch => {
  try {
    dispatch(getUsersRequest())
    const response = await api.users.get()
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
        ...data
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
      dispatch(getUsersThunk())
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
    dispatch(getUsersThunk())
  } catch (error) {
    const err = {
      ...error,
    }
    dispatch(removeUserFailure())
    errorMessage(err.response.data.message)
  }
}