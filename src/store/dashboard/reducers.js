import * as types from '../constants'

export function dashboardReducer(
  state = {
    displaySongs: [],
    isFetching: false,
    lastUpdated: '',
    songs: [],
    obtained: [],
    status: false,
  },
  action
) {
  switch(action.type) {
    case types.DATABASE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
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

    case types.FETCH_PROGRESS_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        obtained: action.obtained,
      })

    case types.FETCH_PROGRESS_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
      })

    case types.UPDATE_PROGRESS_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        obtained: action.obtained,
      })

    case types.UPDATE_PROGRESS_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        obtained: action.obtained,
      })

    case types.ARRANGE_DATA_PROCESS:
      return Object.assign({}, state, {
        displaySongs: action.songs,
      })

    default:
      return state
  }
}
