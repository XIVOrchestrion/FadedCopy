import React from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import HomeDashboard from './HomeDashboard'
import HomeWelcome from './HomeWelcome'

class Home extends React.Component {

  render() {

    return(
      <React.Fragment>
        <div>
          {this.props.isAuthenticated ? (
            <HomeDashboard />
          ) : (
            <HomeWelcome />
          )}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.app.isAuthenticated,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
