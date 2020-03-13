import {
  SIGN_IN_AS_USER_REQUEST,
  SIGN_IN_AS_USER_SUCCESS,
  SIGN_IN_AS_USER_FAILURE,
  ADD_USER_SOCKET_SUCCESS
} from '../action/constants'

const initialState = {
  gettingUsers: false,
  gettingMoreUsers:false,
  hasUsers:true,
  usersData: [],
  signInLoading: false,
  signInAsUserData: {},
}

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_USERS_REQUEST':
      return {
        ...state,
        gettingUsers: true,
      }
    case 'GET_USERS_SUCCSESS':
      return {
        ...state,
        gettingUsers: false,
        usersData: action.payload
      }
    case 'GET_USERS_FAILURE':
      return {
        ...state,
        gettingUsers: false,
      }

      case 'GET_MORE_USERS_REQUEST':
        return {
          ...state,
          gettingMoreUsers: true,
        }
      case 'GET_MORE_USERS_SUCCSESS':
        return {
          ...state,
          gettingMoreUsers: false,
          usersData: [...state.usersData,...action.payload]
        }
      case 'GET_MORE_USERS_FAILURE':
        return {
          ...state,
          gettingMoreUsers: false,
          hasUsers:false
        }

        case 'NO_MORE_USERS':
        return {
          ...state,
          hasUsers: false,
        }
  
case ADD_USER_SOCKET_SUCCESS:
  state.usersData.pop()
  return{
    ...state,
    usersData:[action.payload,...state.usersData]
  }


    case 'CREATE_USER_SUCCSESS':
      return {
        ...state,
        usersData: [...state.usersData, action.payload],
      }
    case 'CREATE_USER_FAILURE':
      return {
        ...state,
      }

    case 'EDIT_USER_SUCCSESS':
      const lastData = state.usersData.filter(
        elem => elem.id !== action.payload.id
      )
      return {
        ...state,
        usersData: [...lastData, action.payload],
      }
    case 'EDIT_USER_FAILURE':
      return {
        ...state,
      }

    case 'REMOVE_USER_SUCCSESS':
      const filtered = state.usersData.filter(
        elem => elem.id !== action.payload
      )
      return {
        ...state,
        usersData: [...filtered],
      }
    case 'REMOVE_USER_FAILURE':
      return {
        ...state,
      }
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
