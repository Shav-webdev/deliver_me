import {
  SIGN_IN_AS_USER_REQUEST,
  SIGN_IN_AS_USER_SUCCESS,
  SIGN_IN_AS_USER_FAILURE,
} from '../action/constants'

const initialState = {
  signInLoading: false,
  signInAsUserData: {},
}

export default function signInAsUser(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_AS_USER_REQUEST:
      return {
        ...state,
        signInLoading: true,
      }
    case SIGN_IN_AS_USER_SUCCESS:
      return {
        ...state,
        signInLoading: false,
        signInAsUserData: action.payload,
      }
    case SIGN_IN_AS_USER_FAILURE:
      return {
        ...state,
        signInLoading: false,
      }
    default:
      return state
  }
}
