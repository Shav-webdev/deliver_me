import axios from 'axios'
import Storage from './localStorage/localStorage'
import {
  message
} from 'antd'
import history from '../routes/history'
import {
  socket
} from './socket'

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
      socket.emit('new_account', {
        data
      })
      successMessage(`${res.data.message}, please login for continue`)
    })
    .catch(e => {
      const err = {
        ...e
      }
      errorMessage(err.response.data.message)
    })
}

export function logOut() {
  Storage.clear()
  history.push('/')
}