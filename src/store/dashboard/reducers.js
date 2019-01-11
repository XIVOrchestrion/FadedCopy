import * as types from '../constants'

export function dashboardReducer(
  state = {
    error: false,
    isFetching: false,
    lastUpdated: '',
    songs: [],
  },
  action
) {
  switch(action.type) {
    case types.DATABASE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        songs: action.songs,
      })

    case types.DATABASE_RECEIVE:
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: action.lastUpdated,
        songs: action.songs,
      })

    case types.DATABASE_RECEIVE_ERROR:
      return Object.assign({}, state, {
        error: action.error
      })

    default:
      return state
  }
}
