import { combineReducers } from 'redux'
import { appReducer } from './app'
import { dashboardReducer } from './dashboard'
import { settingsReducer } from './settings'

export default combineReducers({
  app: appReducer,
  dashboard: dashboardReducer,
  settings: settingsReducer,
})
