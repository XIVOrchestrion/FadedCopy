import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'

export default function configureStore() {
  const middleware = applyMiddleware(thunk)
  // const persistedState = loadState()
  const store = createStore(
    // persistedState,
    reducers,
    composeWithDevTools(middleware)
  )

  return store
}