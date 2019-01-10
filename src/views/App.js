import React, { Component } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { checkUserData, userLogout } from '../store/app'

import {
  Login,
  Settings,
  Welcome,
} from './pages'

import './App.css'

class App extends Component {
  componentDidMount() {
    this.props.checkUserData()
  }

  loginRoute = ({ component: Component, ...rest }) => {
    const auth = this.props.user
    return (
      <Route
        {...rest}
        render={props =>
          auth
            ? <Redirect to={{ pathname: '/settings', state: { from: props.location } }} />
            : <Component {...props} />
        }
      />
    )
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

    const LoginRoute = this.loginRoute
    const PrivateRoute = this.privateRoute

    if (this.props.user === false) {
      return (
        <div className="App">

        </div>
      )
    }

    return (
      <div className="App">
        <Link to={{ pathname: '/login', state: { from: this.props.location } }}>Log in</Link>
        {user &&
          <button onClick={this.props.userLogout}>
            Log out
          </button>
        }

        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Welcome} />
          <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
          <LoginRoute path={`${process.env.PUBLIC_URL}/register`} component={Login} />
          <PrivateRoute path={`${process.env.PUBLIC_URL}/settings`} component={Settings} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state.app

  return {
    user,
  }
}

const mapDispatchToProps = dispatch => ({
  checkUserData: bindActionCreators(checkUserData, dispatch),
  userLogout: bindActionCreators(userLogout, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

// 6715878
