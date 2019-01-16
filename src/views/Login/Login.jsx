import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { userLogin } from '../../store/app'
import { Alert } from '../../components'

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
  }

  componentDidMount() {
    if (this.props.authenticated)
      this.setState({ redirectToReferrer: true })
  }

  componentDidUpdate(prevProps) {
    if (this.props.authenticated !== prevProps.authenticated && this.props.authenticated)
      this.setState({ redirectToReferrer: true })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const email = e.target['email'].value
    const password = e.target['password'].value
    this.props.userLogin(email, password)
  }

  render() {
    const {
      error,
      status,
    } = this.props

    let { from } = this.props.location.state || { from: { pathname: "/settings" } }
    let { redirectToReferrer } = this.state

    if (redirectToReferrer) return <Redirect to={from} />

    const errorMessages = {
      'auth/user-not-found': 'There is no user registered with this email address',
      'auth/wrong-password': 'The password entered is invalid',
    }

    return(
      <main>
        {error &&
          <Alert type="error">
            { errorMessages[error.code] }
          </Alert>
        }

        <form onSubmit={this.handleSubmit}>
          <label>
            Email
            <input
              autoComplete="true"
              id="email"
              type="email"
              placeholder="godbert.manderville@fadedcopy.com"
              required
            />
          </label>

          <label>
            Password
            <input
              id="password"
              type="password"
              required
            />
          </label>

          <button
            type="submit"
            disabled={status ? status === 'loading' || status === 'success' : false}
          >
            Submit
          </button>
        </form>
      </main>
    )
  }
}

Login.propTypes = {
  user: PropTypes.object,
  userLogin: PropTypes.func,
}

const mapStateToProps = (state) => ({
  authenticated: state.app.authenticated,
  error: state.app.error,
  status: state.app.status,
})

const mapDispatchToProps = (dispatch) => ({
  userLogin: bindActionCreators(userLogin, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
