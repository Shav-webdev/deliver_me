import api from '../API'
import Storage from '../../services/localStorage/localStorage'
import {
  signInAsCompanyRequest,
  signInAsCompanyFailure,
  signInAsUserSuccess,
  signInCurrentUserRequest,
  signInCurrentUserSuccess,
  signInCurrentUserFailure,
} from '../action'
import history from '../../routes/history'
import {
  errorMessage,
  successMessage
} from '../../services/services'

export const signInAs = data => async dispatch => {
  try {
    dispatch(signInAsCompanyRequest())
    const response = await api.login.post(data)
    if (response.status !== 200) {
      throw new Error(response.data.message)
    }
    Storage.set('deliver', {
      id: response.data.id,
      token: response.headers.authorization,
      userType: response.data.type,
    })
   await dispatch(
      signInCurrentUserSuccess({
        ...response.data,
        userType: response.data.type,
      })
    )
    if (response.data.type === 'company') {
      successMessage('Sign In is successful !')
      history.push('/company')
    } else {
      successMessage('Sign In is successful !')
      history.push('/user')
    }
  } catch (error) {
    const err = {
      ...error,
    }
    errorMessage(err.response.data.message)
  }
}

export const signInAsAdminThunk = data => async dispatch => {
  try {
    dispatch(signInCurrentUserRequest())
    const response = await api.loginAdmin.post(data)
    console.log(response)
    if (response.status !== 200) {
      throw new Error(response.data.message)
    } else {
       Storage.set('deliver', {
        token: response.headers.authorization,
        userType: 'admin',
      })
      dispatch(
        signInCurrentUserSuccess({
          ...response.data,
          userType: response.data.type,
        })
      )
      history.push('/admin/dashboard')
    }
  } catch (error) {
    const err = {
      ...error,
    }
    errorMessage(err.response.data.message)
  }
}