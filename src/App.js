import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { checkUserData } from './store/app'
import { routes, privateRoutes } from './routes'
import { Header } from './components'

// import {
//   Login,
//   Register,
//   Settings,
//   Home,
// } from './views'

import './App.scss'

class App extends Component {
  componentDidMount() {
    this.props.checkUserData()
  }

  privateRoute = ({ component: Component, ...rest }) => {
    const auth = this.props.user
    return (
      <Route
        {...rest}
        render={props =>
          auth
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
      />
    )
  }

  render() {
    const {
      user
    } = this.props

    const PrivateRoute = this.privateRoute

    if (user === false) {
      return (
        <div className="App">

        </div>
      )
    }

    return (
      <div className="App">
        <Header location={this.props.location} />

        <Switch>
          {routes.map(({path, component}, key) => (
            <Route
              key={key}
              exact
              path={path}
              component={component}
            />
          ))}

          {privateRoutes.map(({path, component}, key) => (
            <PrivateRoute
              key={key}
              exact
              path={path}
              component={component}
            />
          ))}

          <Redirect from="/settings" to="/settings/profile" />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { isAuthenticated, user } = state.app

  return {
    isAuthenticated,
    user,
  }
}

const mapDispatchToProps = dispatch => ({
  checkUserData: bindActionCreators(checkUserData, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

// 6715878
