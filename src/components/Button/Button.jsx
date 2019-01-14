import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './Button.module.scss'

const Button = ({
  classes,
  children,
  tag: Tag,
  to,
}) => {
  return Tag === "link" ? (
    <Link
      className={styles.root}
      to={to}
    >
      { children }
    </Link>
  ) : (
    <Tag
      className={styles.root}
    >
      { children }
    </Tag>
  )
}

Button.propTypes = {
  classes: PropTypes.string,
  children: PropTypes.node,
  tag: PropTypes.oneOf(['a', 'button', 'link']),
}

export default Button
