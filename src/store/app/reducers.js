import * as types from '../constants'

export function appReducer(
  state = {
    user: false,
    isAuthenticated: false,
  },
  action
) {
  switch (action.type) {
    case types.CHECK_USER_DATA:
      return Object.assign({}, state, {
        user: action.user,
        isAuthenticated: action.uid,
      })

    case types.USER_REGISTER_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
        isAuthenticated: action.uid,
      })

    case types.USER_REGISTER_ERROR:
      return Object.assign({}, state, {
        userError: action.userError,
      })

    case types.USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
        isAuthenticated: action.uid,
      })

    case types.USER_LOGIN_ERROR:
      return Object.assign({}, state, {
        userError: action.userError,
      })

    case types.USER_LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
        isAuthenticated: false,
      })

    case types.USER_LOGOUT_ERROR:
      return Object.assign({}, state, {
        userError: action.userError,
      })

    default:
      return state
  }
}
