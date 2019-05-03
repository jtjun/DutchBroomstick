import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_SIGNOUT,
} from 'store/actions'

const initialState = {
  signedIn: false,
  username: null,
  token: null,
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        username: action.username,
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        signedIn: true,
      }
    case USER_LOGIN_FAILED:
      return {
        ...initialState,
      }
    case USER_SIGNOUT:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default userReducer