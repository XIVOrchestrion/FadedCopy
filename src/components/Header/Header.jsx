import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { userLogout } from '../../store/app'
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
      user,
    } = this.props

    return (
      <header className={styles.root}>
        <Link to="/">
          { user ? 'Tracking' : 'Home' }
        </Link>

        {user ? (
          <span>
            <Link to="/settings/profile">Settings</Link>
            <button onClick={this.handleLogout}>
              Log out
            </button>
          </span>
        ) : (
          <span>
            <Link to={{ pathname: '/register', state: { from: location } }}>Register</Link>
            <Link to={{ pathname: '/login', state: { from: location } }}>Log in</Link>
          </span>
        )}
      </header>
    )
  }
}

Header.propTypes = {
  location: PropTypes.object,
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user: state.app.user,
})

const mapDispatchToProps = (dispatch) => ({
  userLogout: bindActionCreators(userLogout, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
