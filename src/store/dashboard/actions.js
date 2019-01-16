import * as types from '../constants'
import { firebaseStore, firebaseStoreValue } from '../../scripts'


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
    .then(() => dispatch(sortSongs('uiCat')))
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


export const sortSongs = (sort) => (dispatch, getState) => {
  const { dashboard } = getState()
  const songs = dashboard.songs.slice(0)

  const groupBy = (list, keyGetter) => {
    const map = new Map()
    list.forEach(item => {
      const key = keyGetter(item)
      const collection = map.get(key)
      if (!collection)
        map.set(key, [item])
      else
        collection.push(item)
    })
    return map
  }

  songs.sort((a, b) => {
    if (a[sort] === b[sort])
      return a.uiOrder - b.uiOrder
    return a[sort] > b[sort] ? 1 : -1
  })

  const grouped = groupBy(songs, song => song[sort])

  dispatch({ type: types.ARRANGE_DATA_PROCESS, songs: grouped })


}


export const getProgress = () => (dispatch, getState) => {
  const { app } = getState()
  const authenticated = app.authenticated
  dispatch({ type: types.FETCH_PROGRESS_REQUEST })
  if (authenticated) {
    firebaseStore.collection('obtained').doc(authenticated).get()
      .then(doc => doc.data())
      .then(res => dispatch(changeProgress(types.FETCH_PROGRESS_SUCCESS, res)))
      .catch(error => dispatch(changeProgressFailure(error)))
  } else {
    dispatch({
      type: types.FETCH_PROGRESS_SUCCESS,
      status: 'success',
    })
  }
}

const changeProgress = (type, obtained) => ({
  type,
  status: 'success',
  loaded: true,
  obtained,
})

const changeProgressFailure = (error) => ({
  type: types.FETCH_PROGRESS_FAILURE,
  error: error,
  status: 'error',
})


export const updateTrack = (id, bool) => (dispatch, getState) => {
  const { app, dashboard } = getState()
  const activeCharacter = app.activeCharacter
  const obtained = dashboard.obtained[activeCharacter] ? dashboard.obtained[activeCharacter].slice(0) : []
  let newObtained

  if (obtained.includes(id))
    newObtained = obtained.filter(value => value !== id)
  else
    newObtained = obtained.concat([id])

  dispatch(changeProgress(types.UPDATE_PROGRESS_REQUEST, {[activeCharacter]: newObtained}))

  const userStore = firebaseStore.collection('obtained').doc(app.authenticated)
  userStore.get()
    .then(doc => {
      const post = {}
      if (bool)
        post[`${activeCharacter}`] = firebaseStoreValue.arrayUnion(id)
      else
        post[`${activeCharacter}`] = firebaseStoreValue.arrayRemove(id)

      userStore.update(post)
    })
    .then(() => dispatch({ type: types.UPDATE_PROGRESS_SUCCESS }))
    .catch(error => {
      console.log(`Error writing document, ${error}`)
      console.log(obtained)
      dispatch({
        type: types.UPDATE_PROGRESS_FAILURE,
        error: error,
        status: 'error',
        obtained: {[activeCharacter]: obtained},
      })
    })
}
