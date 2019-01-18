import React from 'react'
import PropTypes from 'prop-types'
import * as icons from './Icon.assets'

import styles from './Icon.module.scss'

const Icon = ({
  hidden,
  icon,
  paths,
  viewBox,
}) => {
  const iconPaths = icon ? icons[icon] : paths

  return (
    <svg
      className={styles.root}
      viewBox={`0 0 ${viewBox[0]} ${viewBox[1]}`}
      aria-hidden={hidden}
    >
      {iconPaths && iconPaths.map((pathProps, i) => (
        <path {...pathProps} key={i} />
      ))}
    </svg>
  )
}

Icon.propTypes = {
  hidden: PropTypes.bool,
  icon: PropTypes.string,
  viewBox: PropTypes.array,
}

Icon.defaultProps = {
  viewBox: [32, 32],
}

export default Icon
