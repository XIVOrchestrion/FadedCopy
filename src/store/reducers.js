import { combineReducers } from 'redux'
import { appReducer } from './app'
import { dashboardReducer } from './dashboard'

export default combineReducers({
  app: appReducer,
  dashboard: dashboardReducer,
})
