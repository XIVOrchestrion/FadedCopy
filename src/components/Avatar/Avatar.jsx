import React from 'react'
import PropTypes from 'prop-types'

import styles from './Avatar.module.scss'

const Avatar = ({
  alt,
  classes,
  src
}) => {
  return (
    <div className={[styles.root, classes].join(' ')}>
      <img
        src={src}
        alt={alt}
        className={styles.image}
      />
    </div>
  )
}

Avatar.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
}

Avatar.defaultProps = {
  alt: '',
}

export default Avatar
