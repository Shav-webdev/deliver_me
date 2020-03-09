import {
    SIGN_IN_SUCCESS,
    SIGN_IN_REQUEST,
    SIGN_IN_FAILURE,
  } from '../action/constants'
  
  const initialState = {
    signing: false,
    currentUserData: {},
  }
  
  export default function currentUserReducer(state = initialState, action) {
    switch (action.type) {
      case SIGN_IN_REQUEST:
        return {
          ...state,
          signing: true,
        }
      case SIGN_IN_SUCCESS:
        return {
          ...state,
          signing: false,
          currentUserData: action.payload
        }
      case SIGN_IN_FAILURE:
        return {
          ...state,
          signing: false,
        }
      default:
        return state
    }
  }