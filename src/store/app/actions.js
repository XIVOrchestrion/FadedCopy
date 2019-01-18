import * as types from '../constants'
import { firebaseAuth, firebaseStore } from '../../scripts'

export const checkUserData = () => dispatch => {
  dispatch({ type: types.FETCH_USERDATA_REQUEST })
  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      const userRef = firebaseStore.collection('users').doc(user.uid)
      userRef.onSnapshot(doc => {
        dispatch(loadUserData(user, doc.data()))
      }, error => {
        console.log(error)
      })
    } else {
      dispatch(guestUser())
    }
  })
}

const loadUserData = (user, data) => {
  return ({
    type: types.FETCH_USERDATA_SUCCESS,
    activeCharacter: data.activeCharacter,
    authenticated: user.uid,
    characters: data.characters,
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    loaded: true,
  })
}

const guestUser = () => {
  return ({
    type: types.FETCH_USERDATA_SUCCESS,
    activeCharacter: null,
    authenticated: false,
    characters: null,
    displayName: null,
    email: null,
    emailVerified: false,
    loaded: true,
  })
}


export const userSignUp = (email, password, displayName) => dispatch => {
  dispatch(userRegisterProcess(types.USER_REGISTER, 'loading'))
  firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const batch = firebaseStore.batch()
      const userDoc = firebaseStore.collection('users').doc(response.user.uid)
      const obtainedDoc = firebaseStore.collection('obtained').doc(response.user.uid)
      const userData = {
        activeCharacter: null,
        characters: {},
        obtained: {},
      }
      batch.set(userDoc, userData)
      batch.set(obtainedDoc, {})
      batch.commit()
    })
    .then(() => dispatch(userRegisterProcess(types.USER_REGISTER_SUCCESS, 'success')))
    .catch(error => {
      console.log(error)
      dispatch(userRegisterProcess(types.USER_REGISTER_ERROR, 'error', error))
  })
}

const userRegisterProcess = (type, status, error) => ({
  type,
  status,
  error
})


/**
 *
 * @param {string} email The user's email address for sign in
 * @param {string} password The user's password for sign in
 */
export const userLogin = (email, password) => dispatch => {
  dispatch(userLoginProcess(types.USER_LOGIN, 'loading'))
  firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(response => {
      dispatch(userLoginProcess(types.USER_LOGIN_SUCCESS, 'success'))
      return Promise.resolve()
    })
    .catch(error => dispatch(userLoginProcess(types.USER_LOGIN_ERROR, 'error', error)))
}

const userLoginProcess = (type, status, error) => ({
  type,
  status,
  error,
})


/**
 *
 * @param {function} cb Updates the router history to push user back to the homepage on successful logout
 */
export const userLogout = (cb) => (dispatch, getState) => {
  const { app } = getState()
  const userRef = firebaseStore.collection('users').doc(app.authenticated)
  userRef.onSnapshot(() => {})

  firebaseAuth.signOut()
    .then(() => {
      cb()
      dispatch(userLogoutSuccess())
    })
    .catch(error => console.log(error))
}

const userLogoutSuccess = () => ({
  type: types.USER_LOGOUT_SUCCESS,
  user: false,
})
