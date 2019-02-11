import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import * as icons from './Icon.assets'

import styles from './Icon.module.scss'

const Icon = ({
  classes,
  hidden,
  icon,
  paths,
  size,
  viewBox,
}) => {
  const iconPaths = icon ? icons[icon] : paths

  return (
    <span className={
      classNames(styles.root, {
        [styles.small]: size === 'small',
      },
      classes)
    }>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${viewBox[0]} ${viewBox[1]}`}
        aria-hidden={hidden}
      >
        {iconPaths && iconPaths.map((pathProps, i) => (
          <path {...pathProps} key={i} />
        ))}
      </svg>
    </span>
  )
}

Icon.propTypes = {
  classes: PropTypes.string,
  hidden: PropTypes.bool,
  icon: PropTypes.string,
  size: PropTypes.string,
  viewBox: PropTypes.array,
}

Icon.defaultProps = {
  viewBox: [32, 32],
}

export default Icon
