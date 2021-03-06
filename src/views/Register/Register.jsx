import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { userSignUp } from '../../store/app'
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

    const displayName = e.target['displayName'].value
    const email = e.target['email'].value
    const password = e.target['password'].value
    this.props.userSignUp(email, password, displayName)
  }

  render() {
    const {
      error
    } = this.props

    let { from } = { from: { pathname: "/settings/profile/new" } }
    let { redirectToReferrer } = this.state

    if (redirectToReferrer) return <Redirect to={from} />

    return(
      <main>
        {error &&
          <Alert type="error">
            { error.message }
          </Alert>
        }

        <form onSubmit={this.handleSubmit}>
          <label>
            Display Name
            <input
              autoComplete="true"
              id="displayName"
              type="text"
              placeholder="Manderville_Man"
              required
            />
          </label>

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
  userSignUp: PropTypes.func,
}

const mapStateToProps = (state) => ({
  authenticated: state.app.authenticated,
  error: state.app.error,
})

const mapDispatchToProps = (dispatch) => ({
  userSignUp: bindActionCreators(userSignUp, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
