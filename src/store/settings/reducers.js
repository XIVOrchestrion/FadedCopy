import * as types from '../constants'

export function settingsReducer(
  state = {

  },
  action
) {
  switch(action.type) {
    case types.CHARACTER_SEARCH:
      return Object.assign({}, state, {
        loaded: action.loaded,
        searching: action.searching,
      })

    case types.CHARACTER_RESULTS:
      return Object.assign({}, state, {
        loaded: action.loaded,
        pagination: action.pagination,
        results: action.results,
      })

    case types.CHARACTER_RESULTS_ERROR:
      return Object.assign({}, state, {
        error: action.error,
      })

    case types.CHARACTER_SELECT:
      return Object.assign({}, state, {
        character: action.character,
        searching: action.searching,
        token: action.token,
      })

    case types.CHARACTER_SELECT_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        searching: action.searching,
      })

    case types.CHARACTER_AUTH_CHECK:
      return Object.assign({}, state, {
        pass: action.pass,
      })

    case types.CHARACTER_VERIFIED:
      return Object.assign({}, state, {
        verified: action.verified,
      })

    default:
      return state
  }
}
