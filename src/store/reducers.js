import { combineReducers } from 'redux'
import { appReducer } from './app'
import { dashboardReducer } from './dashboard'
import { settingsReducer } from './settings'

const rootReducers = combineReducers({
  app: appReducer,
  dashboard: dashboardReducer,
  settings: settingsReducer,
})

export default rootReducers
