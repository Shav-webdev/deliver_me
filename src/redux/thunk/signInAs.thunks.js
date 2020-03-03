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
      console.log('company response', response)
      console.log('company response data', response.data)
      dispatch(signInAsCompanySuccess(response.data))
      setCookie('token', `${response.data.token}`)
      history.push('/profile/company')
    } else if (response.data.type === 'user') {
      console.log('userresponse', response)
      console.log('userresponse data', response.data)
      dispatch(signInAsUserSuccess(response.data))
      setCookie('token', `${response.data.token}`)
      history.push('/profile/user')
    }
  } catch (error) {
    dispatch(signInAsCompanyFailure())
  }
}
