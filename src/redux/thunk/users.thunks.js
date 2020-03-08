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

export const getUsersThunk = () => async dispatch => {
  try {
    dispatch(getUsersRequest())
    const response = await api.users.get()
    if (response.status !== 200) {
      throw new Error('Cannot get Users')
    }
    dispatch(getUsersSuccsess(response.data))
  } catch (error) {
    dispatch(getUsersFailure())
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
      const response = await api.deleteUpdateUser(data.id).put({ ...data })
      if (response.status !== 201) {
        throw new Error('Cannot update User')
      }
      dispatch(editUserSuccsess(response.data))
    } else {
      const response = await api.users.post({
        ...data,
      })
      dispatch(createUserSuccsess(response.data))
      dispatch(getUsersThunk())
      if (response.status !== 201) {
        throw new Error('Cannot create User')
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const removeUserThunk = id => async dispatch => {
  try {
    await api.deleteUpdateUser(id).delete()
    dispatch(removeUserSuccsess(id))
    dispatch(getUsersThunk())
  } catch (error) {
    dispatch(removeUserFailure())
  }
}
