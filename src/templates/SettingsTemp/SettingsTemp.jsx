import React from 'react'
import PropTypes from 'prop-types'

class SettingsTemp extends React.Component {
  render() {
    const {
      children
    } = this.props

    return(
      <main>
        { children }
      </main>
    )
  }
}

SettingsTemp.propTypes = {
  children: PropTypes.node,
}

export default SettingsTemp
