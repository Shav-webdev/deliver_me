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
  console.log(data)
  try {
    dispatch(signInAsCompanyRequest())
    const response = await api.login.post(data)
    if (response.status !== 200) {
      throw new Error('Something went wrong, try again')
    }
    if (response.data.type === 'company') {
      dispatch(signInAsCompanySuccess(response.data))
      setCookie('token', `${response.data.token}`)
      history.push('/profile/company')
    } else if (response.data.type === 'user') {
      dispatch(signInAsUserSuccess(response.data))
      setCookie('token', `${response.data.token}`)
      history.push('/profile/user')
    } else {
      console.log('adminresponse data', response.data)
      dispatch(signInAsUserSuccess(response.data))
      setCookie('token', `${response.data.token}`)
      history.push('/admin/dashboard')
    }
  } catch (error) {
    dispatch(signInAsCompanyFailure())
  }
}
