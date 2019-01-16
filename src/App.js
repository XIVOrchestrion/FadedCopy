import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { version } from '../package.json'
import { checkUserData } from './store/app'
import { fetchSongsIfNeeded, sortSongs } from './store/dashboard'
import { routes, privateRoutes } from './routes'
import { Header, Alert } from './components'
import styles from './App.module.scss'

class App extends React.Component {
  componentDidMount() {
    this.props.checkUserData()
    this.props.fetchSongsIfNeeded()
  }

  componentDidUpdate(prevProps) {
    if (this.props.songs !== prevProps.songs)
      this.props.sortSongs('uiCat')
  }

  privateRoute = ({ component: Component, ...rest }) => {
    const auth = this.props.authenticated
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
      user,
      userData,

      loaded,
    } = this.props

    const PrivateRoute = this.privateRoute

    if (!loaded) {
      return (
        <div className="App">
          LOADING, YO
        </div>
      )
    }

    return (
      <div className="App">
        <Header location={this.props.location} />

        <Alert
          type="warning"
        >
          Welcome to the FadedCopy ({ version }) ALPHA Test Site. Expect bugs everywhere.
        </Alert>

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

        <footer className={styles.footer}>
          <div>
            <span>FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.</span>
            <span>FINAL FANTASY XIV © SQUARE ENIX CO., LTD.</span>
          </div>
          <div>
            Assembled by Mayo Steakfries of Coeurl
          </div>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { isAuthenticated, user, userData } = state.app

  return {
    isAuthenticated,
    user,
    userData,

    activeCharacter: state.app.activeCharacter,
    authenticated: state.app.authenticated,
    characters: state.app.characters,
    displayName: state.app.displayName,
    email: state.app.email,
    emailVerified: state.app.emailVerified,
    loaded: state.app.loaded,
    songs: state.dashboard.songs,
  }
}

const mapDispatchToProps = dispatch => ({
  checkUserData: bindActionCreators(checkUserData, dispatch),
  fetchSongsIfNeeded: bindActionCreators(fetchSongsIfNeeded, dispatch),
  sortSongs: bindActionCreators(sortSongs, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

// 6715878
