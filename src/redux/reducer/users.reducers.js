const initialState = {
  gettingUsers: false,
  usersData: []
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USERS_REQUEST":
      return {
        ...state,
        gettingUsers: true
      };
    case "GET_USERS_SUCCSESS":
      return {
        ...state,
        gettingUsers: false,
        usersData: action.payload
      };
    case "GET_USERS_FAILURE":
      return {
        ...state,
        gettingUsers: false
      };

    case "CREATE_USER_SUCCSESS":
      return {
        ...state,
        usersData: [...state.usersData, action.payload]
      };
    case "CREATE_USER_FAILURE":
      return {
        ...state
      };

    case "EDIT_USER_SUCCSESS":
      const lastData = state.usersData.filter(
        elem => elem.id !== action.payload.id
      );
      return {
        ...state,
        usersData: [...lastData, action.payload]
      };
    case "EDIT_USER_FAILURE":
      return {
        ...state
      };

    case "REMOVE_USER_SUCCSESS":
      const filtered = state.usersData.filter(
        elem => elem.id !== action.payload
      );
      return {
        ...state,
        usersData: [...filtered]
      };
    case "REMOVE_USER_FAILURE":
      return {
        ...state
      };
    default:
      return state;
  }
}
