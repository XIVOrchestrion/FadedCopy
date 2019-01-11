import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { checkUserData } from '../store/app'

import { Header } from '../components'

import {
  Login,
  Register,
  Settings,
  Home,
} from './pages'

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
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
          <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
          <Route path={`${process.env.PUBLIC_URL}/register`} component={Register} />
          <PrivateRoute path={`${process.env.PUBLIC_URL}/settings`} component={Settings} />
          <PrivateRoute path={`${process.env.PUBLIC_URL}/settings/profile`} component={Settings} />
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
