import axios from 'axios'
import { eraseCookie, getCookie, setCookie } from './cookies'
import { message } from 'antd'
import history from '../../../routes/history'
import { store } from '../../../redux/store'
import { currentCompany, currentUser } from '../../../redux/actions'

export const successMessage = (msg = '') => {
  message.success(msg)
}

export const errorMessage = (msg = '') => {
  message.error(msg)
}

export function signUp(url, data) {
  axios
    .post(`${url}`, data)
    .then(res => {
      successMessage(`${res.data.message}, please login for continue`)
    })
    .catch(e => {
      errorMessage(`Error.${e.response.data.message}`)
    })
}

export function signIn(url, data) {
  axios
    .post(`${url}`, data)
    .then(res => {
      setCookie('token', `${res.data.token}`)
      successMessage('You will redirected to your profile soon')
      if (!getCookie('token')) {
        errorMessage('Something went wrong, please sign in again')
        history.push('/')
      } else {
        if (res.data.type === 'company') {
          store.dispatch(currentCompany(res.data))
          history.push('/profile/company')
        } else if (res.data.type === 'user') {
          store.dispatch(currentUser(res.data))
          history.push('/profile/user')
        }
      }
    })
    .catch(e => {
      console.log(e.response)

      errorMessage(e.response.data.message)
    })
}

export function logOut() {
  eraseCookie('token')
  history.push('/')
}
