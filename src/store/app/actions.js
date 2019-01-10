import * as types from '../constants'
import { firebaseAuth } from '../../scripts/firebase'

export const checkUserData = () => dispatch => {
  firebaseAuth.onAuthStateChanged(user => {
    if (user)
      dispatch({
        type: types.CHECK_USER_DATA,
        user: user
      })
    else
      dispatch({
        type: types.CHECK_USER_DATA,
        user: null
      })
  })
}

export const userSignUp = async (email, password, displayName) => {
  firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(() => firebaseAuth.currentUser.updateProfile({ displayName }))
    .then(() => {})
    .catch(error => console.log(error))
}

export const userLogin = (email, password, cb) => dispatch => {
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
  }
})

const userLoginError = response => ({
  type: types.USER_LOGIN_ERROR,
  userError: response,
})

export const userLogout = () => dispatch => {
  firebaseAuth.signOut()
    .then(() => dispatch(userLogoutSuccess()))
    .catch(error => console.log(error))
}

const userLogoutSuccess = () => ({
  type: types.USER_LOGOUT_SUCCESS,
  user: false,
})
