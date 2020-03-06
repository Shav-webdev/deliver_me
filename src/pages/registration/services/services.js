import axios from 'axios'
import { eraseCookie, getCookie, setCookie } from './cookies'
import { message } from 'antd'
import history from '../../../routes/history'
import store from '../../../redux/storeNew/store'
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

// export function signIn(url, data) {
//   axios
//     .post(`${url}`, data)
//     .then(res => {
//       setCookie('token', `${res.data.token}`)
//       successMessage('You will redirected to your profile soon')
//       if (!getCookie('token')) {
//         errorMessage('Something went wrong, please sign in again')
//         history.push('/')
//       } else {
//         if (res.data.type === 'company') {
//           store.dispatch(currentCompany(res.data.data))
//           history.push('/profile/company')
//         } else if (res.data.type === 'user') {
//           store.dispatch(currentUser(res.data.data))
//           history.push('/profile/user')
//         } else {
//           history.push('/admin/dashboard')
//         }
//       }
//     })
//     .catch(e => {
//       console.log(e)

//       console.log(e.response)
//       errorMessage(e.response.data.message)
//     })
// }
export function logOut() {
  eraseCookie('token')
  history.push('/')
}
