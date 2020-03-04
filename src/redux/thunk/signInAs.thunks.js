import api from '../API'
import {
  signInAsCompanyRequest,
  signInAsCompanySuccess,
  signInAsCompanyFailure,
  signInAsUserSuccess,
} from '../action'
import history from '../../routes/history'
import { setCookie } from '../../pages/registration/services/cookies'

export const signInAs = data => async dispatch => {
  try {
    dispatch(signInAsCompanyRequest())
    const response = await api.login.post(data)
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again')
    }
    if (response.data.type === 'company') {
      setCookie('token', `${response.data.token}`)
      setCookie('id', `${response.data.id}`)
      history.push('/profile/company')
    } else if (response.data.type === 'user') {
      dispatch(signInAsUserSuccess(response.data))
      setCookie('token', `${response.data.token}`)
      setCookie('id', `${response.data.id}`)

      history.push('/profile/user')
    } else {
      dispatch(signInAsUserSuccess(response.data))
      setCookie('token', `${response.data.token}`)
      history.push('/admin/dashboard')
    }
  } catch (error) {
    dispatch(signInAsCompanyFailure())
  }
}
