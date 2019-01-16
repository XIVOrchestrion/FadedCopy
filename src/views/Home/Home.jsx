import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

class Home extends React.Component {

  render() {

    return(
      <React.Fragment>
        <div>
          {this.props.authenticated ? (
            <Redirect to="/rolls" />
          ) : (
            <main>
              <h1>Hello World</h1>
            </main>
          )}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.app.authenticated,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
