import * as types from '../constants'
import xivapiKey from '../../scripts/secret/xivapiKey'
import { firebaseStore, firebaseStoreValue } from '../../scripts'


/**
 *
 * @param {string} name Character Name to search for
 * @param {string} world Target server to check for Character
 */
export const searchCharacter = (name, world) => dispatch => {
  dispatch({
    type: types.CHARACTER_SEARCH,
    loaded: false,
    searching: true,
  })

  fetch(`https://xivapi.com/character/search?key=${xivapiKey}&name=${name}&server=${world}`, {
    method: 'GET',
    mode: 'cors',
  })
    .then(res => res.json())
    .then(res => {
      if (res.Error)
        throw res.Message

      dispatch(characterResults(res))
    })
    .catch(error => dispatch(characterResultsError(error)))
}

const characterResults = (res) => ({
  type: types.CHARACTER_RESULTS,
  loaded: true,
  pagination: res.Pagination,
  results: res.Results,
})

const characterResultsError = (error) => ({
  type: types.CHARACTER_RESULTS_ERROR,
  error
})


/**
 * Marks a character as selected, enabling verification for that character
 *
 * @param {Object} character The character data object
 */
export const selectCharacter = (character) => (dispatch, getState) => {
  const { app } = getState()

  if (app.characters && app.characters[character.ID])
    return dispatch({
      type: types.CHARACTER_SELECT_ERROR,
      searching: false,
      error: `${character.Name} has already been verified on your account!`
    })

  const dec2hex = (dec) => (`0${dec.toString(16)}`).substr(-2)

  const generateId = (len) => {
    const arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
  }

  dispatch({
    type: types.CHARACTER_SELECT,
    searching: false,
    token: `FADED${generateId(20).toUpperCase()}`,
    character
  })

  fetch(`https://xivapi.com/character/${character.ID}/verification?key=${xivapiKey}`, {
    method: 'GET',
    mode: 'cors',
  })
    .then(res => res.json())
    .then(res => dispatch(characterAuth(res)))
    .catch(error => dispatch(characterAuthError(error)))
}

export const checkCharacterToken = (token) => (dispatch, getState) => {
  const { app, settings } = getState()

  const character = settings.character
  const charID = character.ID

  console.log(character, charID)

  fetch(`https://xivapi.com/character/${charID}/verification?key=${xivapiKey}&token=${token}`, {
    method: 'GET',
    mode: 'cors',
  })
    .then(res => res.json())
    .then(res => {
      dispatch(characterAuth(res))
      if (res.Pass)
        dispatch(addCharacterToUser(character, app.authenticated))
    })
    .catch(error => dispatch(characterAuthError(error)))
}

const characterAuth = (response) => ({
  type: types.CHARACTER_AUTH_CHECK,
  pass: response.Pass,
})

const characterAuthError = (error) => {
  console.log(error)
}


/**
 *
 * @param {*} character
 * @param {*} uid
 */
const addCharacterToUser = (character, uid) => dispatch => {
  const userStore = firebaseStore.collection('users').doc(uid)
  const post = {}
  const data = {
    added: firebaseStoreValue.serverTimestamp(),
    avatar: character.Avatar,
    id: character.ID,
    name: character.Name,
    server: character.Server,
  }
  post['activeCharacter'] = character.ID
  post[`characters.${character.ID}`] = data

  console.log(post)

  firebaseStore.collection('obtained').doc(uid).update({ [`${character.ID}`]: [] })

  userStore.get()
    .then(doc => userStore.update(post))
    .then(() => dispatch(characterVerified()))
    .catch(error => {})
}

const characterVerified = () => ({
  type: types.CHARACTER_VERIFIED,
  verified: true,
})


export const removeCharacter = (id) => (dispatch, getState) => {
  const { app } = getState()
  const uid = app.authenticated
  const characterList = Object.keys(app.characters)

  /**
   * If there is only one character, remove it and set the active Characters value to empty
   */
  if (characterList.length === 1) {
    const batch = firebaseStore.batch()
    const userRef = firebaseStore.collection('users').doc(uid)
    const obtainedRef = firebaseStore.collection('obtained').doc(uid)

    batch.update(userRef, {
      [`characters.${id}`]: firebaseStoreValue.delete(),
      'activeCharacter': null
    })
    batch.update(obtainedRef, {[`${id}`]: firebaseStoreValue.delete() })
    batch.commit()
      .then(() => console.log('Batch sent successfully'))
      .catch(error => console.log(error))
  }

}
