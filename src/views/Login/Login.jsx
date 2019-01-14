import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { userLogin } from '../../store/app'

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
  }

  componentDidMount() {
    if (this.props.user)
      this.setState({ redirectToReferrer: true })
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user && this.props.user !== null)
      this.setState({ redirectToReferrer: true })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const email = e.target['email'].value
    const password = e.target['password'].value
    this.props.userLogin(email, password)
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/settings" } }
    let { redirectToReferrer } = this.state

    if (redirectToReferrer) return <Redirect to={from} />

    return(
      <main>
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
          >
            Submit
          </button>
        </form>
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.app.user,
})

const mapDispatchToProps = (dispatch) => ({
  userLogin: bindActionCreators(userLogin, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)