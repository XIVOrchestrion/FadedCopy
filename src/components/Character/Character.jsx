import React from 'react'
import PropTypes from 'prop-types'

import styles from './Character.module.scss'

const Character = ({
  avatar,
  classes,
  id,
  name,
  server,
}) => {
  return (
    <div
      className={[styles.root, classes].join(' ')}
    >
      <img
        src={avatar}
        className={styles.image}
        alt=""
      />
      <div className={styles.content}>
        <span className={styles.name}>
          { name }
        </span>
        <span className={styles.server}>
          { server }
        </span>
      </div>
    </div>
  )
}

Character.propTypes = {
  avatar: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string,
  server: PropTypes.string,
}

export default Character
