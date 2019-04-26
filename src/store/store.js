import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

export default function configureStore() {
  const middleware = applyMiddleware(thunkMiddleware)
  // const persistedState = loadState()
  const store = createStore(
    // persistedState,
    rootReducer,
    undefined,
    composeWithDevTools(middleware)
  )

  return store
}
