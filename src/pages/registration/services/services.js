import axios from 'axios'
import { eraseCookie, getCookie, setCookie } from './cookies'
import { message } from 'antd'
import history from '../../../routes/history'
import socket from '../../../App'

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
      console.log("data service",data)
      socket.emit('new_account', data);
      successMessage(`${res.data.message}, please login for continue`)
    })
    .catch(e => {
      errorMessage(`Error.${e}`)
    })
}

export function logOut() {
  eraseCookie('token')
  history.push('/')
}
