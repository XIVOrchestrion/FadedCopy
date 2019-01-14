import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import configureStore from './store/store'

import './index.css'
import './styles/reset.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const AppRoute = props => ( <App location={props.location} /> )
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={AppRoute} />
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
