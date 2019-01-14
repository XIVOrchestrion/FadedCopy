import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './secret/firebaseConfig'

firebase.initializeApp(firebaseConfig)

export const firebaseAuth = firebase.auth()
export const firebaseStore = firebase.firestore()
export const firebaseStoreValue = firebase.firestore.FieldValue

firebaseStore.settings({
  timestampsInSnapshots: true
})
