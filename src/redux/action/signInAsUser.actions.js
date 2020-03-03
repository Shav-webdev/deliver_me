import {
  SIGN_IN_AS_USER_REQUEST,
  SIGN_IN_AS_USER_SUCCESS,
  SIGN_IN_AS_USER_FAILURE,
} from './constants'

export const signInAsUserRequest = () => ({
  type: SIGN_IN_AS_USER_REQUEST,
})
export const signInAsUserSuccess = data => ({
  type: SIGN_IN_AS_USER_SUCCESS,
  payload: data,
})
export const signInAsUserFailure = () => ({
  type: SIGN_IN_AS_USER_FAILURE,
})
