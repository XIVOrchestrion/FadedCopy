import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Alert.module.scss'

const Alert = ({
  children,
  type,
}) => {
  return(
    <div
      className={classNames(styles.root, {
        [`${styles[type]}`]: type,
      })}
    >
      { children }
    </div>
  )
}

Alert.propTypes = {
  /**
   * `Alert` box body content
   */
  children: PropTypes.node,
  /**
   *
   */
  type: PropTypes.oneOf(['error', 'message', 'success', 'warning']).isRequired,
}

Alert.defaultProps = {
  type: 'warning',
}

export default Alert
