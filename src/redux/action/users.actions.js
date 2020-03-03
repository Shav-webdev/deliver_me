import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCSESS,
  GET_USERS_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCSESS,
  CREATE_USER_FAILURE,
  REMOVE_USER_REQUEST,
  REMOVE_USER_SUCCSESS,
  REMOVE_USER_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCSESS,
  EDIT_USER_FAILURE
} from "./constants";

export const getUsersRequest = () => ({
    type: GET_USERS_REQUEST
  })
  export const getUsersSuccsess = (data) => ({
    type: GET_USERS_SUCCSESS,
    payload: data
  })
  export const getUsersFailure = () => ({
    type: GET_USERS_FAILURE
  })

  export const createUserRequest = () => ({
    type: CREATE_USER_REQUEST
  })
  export const createUserSuccsess = (data) => ({
    type: CREATE_USER_SUCCSESS,
    payload: data
  })
  export const createUserFailure = () => ({
    type: CREATE_USER_FAILURE
  })

  export const removeUserRequest = () => ({
    type: REMOVE_USER_REQUEST
  })
  export const removeUserSuccsess = (data) => ({
    type: REMOVE_USER_SUCCSESS,
    payload: data
  })
  export const removeUSERFailure = () => ({
    type: REMOVE_USER_FAILURE
  })

  export const editUserRequest = () => ({
    type: EDIT_USER_REQUEST
  })
  export const editUserSuccsess = (data) => ({
    type: EDIT_USER_SUCCSESS,
    payload: data
  })
  export const editUserFailure = () => ({
    type: EDIT_USER_FAILURE
  })