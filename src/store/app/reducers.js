import * as types from '../constants'

export function appReducer(
  state = {
    user: false,
    userData: false,
    isAuthenticated: false,

    activeCharacter: null,
    authenticated: false,
    characters: null,
    displayName: null,
    email: null,
    emailVerified: false,
    loaded: false,
  },
  action
) {
  switch (action.type) {
    case types.FETCH_USERDATA_SUCCESS:
      return Object.assign({}, state, {
        activeCharacter: action.activeCharacter,
        authenticated: action.authenticated,
        characters: action.characters,
        displayName: action.displayName,
        email: action.email,
        emailVerified: action.emailVerified,
        loaded: action.loaded,
      })

    case types.USER_REGISTER:
      return Object.assign({}, state, {
        status: action.status,
      })

    case types.USER_REGISTER_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
      })

    case types.USER_REGISTER_ERROR:
      return Object.assign({}, state, {
        status: action.status,
      })

    case types.USER_LOGIN:
      return Object.assign({}, state, {
        status: action.status,
      })

    case types.USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
      })

    case types.USER_LOGIN_ERROR:
      return Object.assign({}, state, {
        status: action.status,
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
