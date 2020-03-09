import api from '../API'
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
  setCookie
} from '../../pages/registration/services/cookies'
import {
  errorMessage,
  successMessage,
} from '../../pages/registration/services/services'

export const signInAs = data => async dispatch => {
  try {
    dispatch(signInAsCompanyRequest())
    const response = await api.login.post(data)
    if (response.status !== 200) {
      throw new Error(response.data.message)
    }
    if (response.data.type === 'company') {
      setCookie('token', `${response.data.token}`)
      setCookie('id', `${response.data.id}`)
      setCookie('userType', 'company')
     // signInAsCompanySuccess(response.data)
     dispatch(
      signInCurrentUserSuccess({
        ...response.data,
        userType: response.data.type,
      })
    )
      successMessage('Sign In is successful !')
      history.push('/company')
    } else if (response.data.type === 'user') {
     // dispatch(signInAsUserSuccess(response.data))
      setCookie('token', `${response.data.token}`)
      setCookie('id', `${response.data.id}`)
      setCookie('userType', `${response.data.type}`)
      dispatch(
        signInCurrentUserSuccess({
          ...response.data,
          userType: response.data.type,
        }))
      successMessage('Sign In is successful !')
      history.push('/profile/user')
    } else {
      dispatch(signInAsUserSuccess(response.data))
      setCookie('token', `${response.data.token}`)
      setCookie('userType', 'admin')
      history.push('/admin/dashboard')
    }
  } catch (error) {
    console.log({
      error
    })
    const err = {
      ...error
    }
    dispatch(signInAsCompanyFailure())
    errorMessage(err.response.data.message)
  }
}

export const signInAsAdminThunk = data => async dispatch => {
  try {
    //dispatch(signInCurrentUserRequest())
    const response = await api.loginAdmin.post(data)
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again')
    } else {
      console.log(response.data)
      setCookie('token',response.data.token)
      setCookie('userType','admin')
      dispatch(
        signInCurrentUserSuccess({
          ...response.data,
          userType: response.data.type,
        })
      )
      history.push('/admin/dashboard')
    }
  } catch (error) {
    dispatch(signInCurrentUserFailure())
  }
}