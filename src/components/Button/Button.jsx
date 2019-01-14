import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './Button.module.scss'

const Button = ({
  classes,
  children,
  disabled,
  handleClick,
  tag: Tag,
  to,
}) => {
  return Tag === "link" ? (
    <Link
      className={styles.root}
      to={to}
      disabled={disabled}
    >
      { children }
    </Link>
  ) : (
    <Tag
      className={styles.root}
      onClick={handleClick}
      disabled={disabled}
    >
      { children }
    </Tag>
  )
}

Button.propTypes = {
  /**
   * Classes override
   */
  classes: PropTypes.string,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * If `true` the `Button` will be disabled
   */
  disabled: PropTypes.bool,
  /**
   *
   */
  handleClick: PropTypes.func,
  /**
   * Defines the HTML tag for the `Button`
   */
  tag: PropTypes.oneOf(['a', 'button', 'link']),
}

Button.defaultProps = {
  tag: 'button',
}

export default Button
