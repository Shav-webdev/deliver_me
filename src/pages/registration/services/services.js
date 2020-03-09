import axios from 'axios'
import { eraseCookie, getCookie, setCookie } from './cookies'
import { message } from 'antd'
import history from '../../../routes/history'
import { socket } from '../../../App'

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
      socket.emit('new_account', { data })
      successMessage(`${res.data.message}, please login for continue`)
    })
    .catch(e => {
      errorMessage(`Error.${e}`)
    })
}

export function logOut() {
 setCookie('userType','')
 setCookie('token','')
   // eraseCookie('token')
   // eraseCookie('userType')
  
  history.push('/')
  // Cookies.remove('userType')
  // Cookies.remove('token')
 
}
