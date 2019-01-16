import * as types from '../constants'

export function dashboardReducer(
  state = {

    isFetching: false,
    lastUpdated: '',
    songs: [],
    obtained: false,
    status: false,
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

    default:
      return state
  }
}
