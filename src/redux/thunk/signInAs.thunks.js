import api from '../API'
import {
  signInAsCompanyRequest,
  signInAsCompanySuccess,
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
      console.log(response)
      errorMessage(response.data.message)
      throw new Error('Something went wrong, try again')
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
      dispatch(signInAsUserSuccess(response.data))
      setCookie('token', `${response.data.token}`)
      history.push('/admin/dashboard')
    }
  } catch (error) {
    dispatch(signInAsCompanyFailure())
    errorMessage('')
  }
}