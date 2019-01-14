import * as types from '../constants'
import { firebaseAuth, firebaseStore } from '../../scripts'

export const checkUserData = () => dispatch => {
  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: types.CHECK_USER_DATA,
        user: {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          uid: user.uid,
        },
        uid: user.uid,
      })

      firebaseStore.collection('users').doc(user.uid)
        .onSnapshot(doc => dispatch({
          type: types.USER_DATA,
          userData: doc.data()
        }))
    } else {
      dispatch({
        type: types.CHECK_USER_DATA,
        user: null
      })
    }
  })
}


export const userSignUp = (email, password, displayName) => dispatch => {
  firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then((response) => {
      firebaseAuth.currentUser.updateProfile({ displayName })
      return response
    })
    .then((response) => dispatch(userSignUpSuccess(response)))
    .catch(error => dispatch(userSignUpError(error)))
}

const userSignUpSuccess = (response) => ({
  type: types.USER_REGISTER_SUCCESS,
  user: {
    displayName: response.user.displayName,
    email: response.user.email,
    emailVerified: response.user.emailVerified,
    uid: response.user.uid,
  },
  uid: response.user.uid,
})

const userSignUpError = response => ({
  type: types.USER_REGISTER_ERROR,
  userError: response,
})


/**
 *
 * @param {string} email The user's email address for sign in
 * @param {string} password The user's password for sign in
 */
export const userLogin = (email, password) => dispatch => {
  firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(response => {
      dispatch(userLoginSuccess(response))
      return Promise.resolve()
    })
    .catch(error => dispatch(userLoginError(error)))
}

const userLoginSuccess = response => ({
  type: types.USER_LOGIN_SUCCESS,
  user: {
    displayName: response.user.displayName,
    email: response.user.email,
    emailVerified: response.user.emailVerified,
    uid: response.user.uid,
  },
  uid: response.user.uid,
})

const userLoginError = response => ({
  type: types.USER_LOGIN_ERROR,
  userError: response,
})


/**
 *
 * @param {function} cb Updates the router history to push user back to the homepage on successful logout
 */
export const userLogout = (cb) => dispatch => {
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
