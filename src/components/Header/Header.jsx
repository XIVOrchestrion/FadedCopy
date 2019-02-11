import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { userLogout } from '../../store/app'
import { Avatar, Icon } from '../'
import styles from './Header.module.scss'

class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  handleLogout = () => {
    this.props.userLogout(() =>  this.context.router.history.push('/'))
  }

  render() {
    const {
      location,
      authenticated,
      activeCharacter,
      characters,
    } = this.props

    return (
      <header className={styles.root}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <NavLink
              exact
              to="/"
              className={styles.logoLink}
            >
              <Icon icon="fadedCopyLogo" />
            </NavLink>
          </div>

          <NavLink
            to="/rolls"
            className={styles.link}
            activeClassName={styles.selected}
          >
            Rolls
          </NavLink>

          {authenticated ? (
            <React.Fragment>
              <NavLink
                to="/settings/profile"
                className={styles.link}
                activeClassName={styles.selected}
              >
                Settings
              </NavLink>
              <button onClick={this.handleLogout}>
                Log out
              </button>

              <Avatar
                classes={styles.avatar}
                src={activeCharacter ? characters[activeCharacter].avatar : null}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavLink
                to={{ pathname: '/register', state: { from: location } }}
                className={styles.link}
                activeClassName={styles.selected}
              >
                Register
              </NavLink>
              <NavLink
                to={{ pathname: '/login', state: { from: location } }}
                className={styles.link}
                activeClassName={styles.selected}
              >
                Log in
              </NavLink>
            </React.Fragment>
          )}
        </nav>
      </header>
    )
  }
}

Header.propTypes = {
  location: PropTypes.object,
  authenticated: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

const mapStateToProps = (state) => ({
  authenticated: state.app.authenticated,
  activeCharacter: state.app.activeCharacter,
  characters: state.app.characters,
})

const mapDispatchToProps = (dispatch) => ({
  userLogout: bindActionCreators(userLogout, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
