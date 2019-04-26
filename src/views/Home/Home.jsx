import React from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

class Home extends React.Component {

  render() {

    return(
      <React.Fragment>
        <h1>Hello World</h1>
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
