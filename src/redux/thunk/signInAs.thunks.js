import api from '../API'
import {
  signInAsCompanyRequest,
  signInAsCompanyFailure,
  signInAsUserSuccess,
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
      successMessage('Sign In is successful !')
      history.push('/profile/company')
    } else if (response.data.type === 'user') {
      dispatch(signInAsUserSuccess(response.data))
      setCookie('token', `${response.data.token}`)
      setCookie('id', `${response.data.id}`)
      successMessage('Sign In is successful !')
      history.push('/profile/user')
    } else {
      throw new Error('Something went wrong')
    }
  } catch (error) {
    console.log({
      error
    })
    const err = {
      ...error
    }
    // const message = err.response.data.message;
    dispatch(signInAsCompanyFailure())
    errorMessage(err.response.data.message)
  }
}

export const signInAsAdminThunk = data => async dispatch => {
  try {
    dispatch(signInAsCompanyRequest())
    const response = await api.loginAdmin.post(data)
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again')
    } else {
      dispatch(signInAsUserSuccess(response.data))
      setCookie('token', `${response.data.token}`)
      successMessage('Sign In is successful !')
      history.push('/admin/dashboard')
    }
  } catch (error) {
    const err = {
      ...error
    }
    dispatch(signInAsCompanyFailure())
    errorMessage(err.response.data.message)
  }
}