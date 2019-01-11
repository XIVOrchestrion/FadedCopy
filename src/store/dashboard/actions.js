import * as types from '../constants'
import { firebaseStore } from '../../scripts'

/**
 * Fire a request to the Firebase Store to receive the Orchestrion Overview
 * This data will be ordered by `id`
 * Data is then saved to localStorage
 */
const requestSongs = () => dispatch => {
  const res = []
  dispatch(requestDatabase())

  firebaseStore.collection('data').doc('rolls').collection('overview').orderBy('id').get()
    .then(snapshot => snapshot.forEach(doc => res.push(doc.data()) ))
    .then(() => {
      localStorage.setItem('songs', JSON.stringify(res))
      dispatch(receiveDatabase())
    })
    .catch(err => dispatch(receiveDatabaseError(err)))
}

const requestDatabase = () => {
  return {
    type: types.DATABASE_REQUEST,
  }
}

const receiveDatabase = () => {
  return {
    type: types.DATABASE_RECEIVE,
    songs: JSON.parse(localStorage.getItem('songs')),
    lastUpdated: localStorage.getItem('lastUpdated'),
  }
}

const receiveDatabaseError = (error) => {
  return {
    type: types.DATABASE_RECEIVE_ERROR,
    error,
  }
}

/**
 * Fire a request to the Firebase Store to check when the Orchestrion Data was last updated
 */
const shouldFetchSongs = async () => {
  return await firebaseStore.collection('data').doc('lastUpdated').get()
    .then(doc => doc.data().lastUpdated.toDate())
    .then(date => date.toUTCString())
    .then(apiLastUpdate => {
      const appLastUpdate = localStorage.getItem('lastUpdated')
      if (apiLastUpdate !== appLastUpdate) {
        localStorage.setItem('lastUpdated', apiLastUpdate)
        return true
      } else {
        return false
      }
    })
}

/**
 * Check if Orchestrion Rolls should be fetched with `shouldFetchSongs()`
 * If `true`, make a new request with `requestSongs()`, else fetch data from `localStorage`
 */
export const fetchSongsIfNeeded = () => dispatch => {
  shouldFetchSongs()
    .then(response => {
      if(response)
        return dispatch(requestSongs())
      else
        return dispatch(receiveDatabase())
    })
}
