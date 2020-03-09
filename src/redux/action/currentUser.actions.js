import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from './constants'

export const signInCurrentUserRequest = () => ({
  type: SIGN_IN_REQUEST,
})
export const signInCurrentUserSuccess = data => ({
  type: SIGN_IN_SUCCESS,
  payload: data,
})
export const signInCurrentUserFailure = () => ({
  type: SIGN_IN_FAILURE,
})