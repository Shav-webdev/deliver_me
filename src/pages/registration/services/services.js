import axios from 'axios'
import { eraseCookie, getCookie, setCookie } from './cookies'
import { message } from 'antd'
import history from '../../../routes/history'

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

export function logOut() {
  eraseCookie('token')
  history.push('/')
}
