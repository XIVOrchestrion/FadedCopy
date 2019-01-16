import React from 'react'
import PropTypes from 'prop-types'

import styles from './SongCard.module.scss'

const SongCard = ({
  checked,
  desc,
  handleChange,
  id,
  name,
  tracking,
  uiCat,
  uiId,
  uiOrder,
}) => {

  return(
    <div className={styles.root}>
      {tracking &&
        <input
          id={id}
          checked={checked}
          type="checkbox"
          onChange={handleChange}
        />
      }
      <div className={styles.number}>
        { uiId }.
      </div>
      <div className={styles.name}>
        { name.en }
      </div>
      <div className={styles.desc}>
        { desc.en }
      </div>
    </div>
  )
}

SongCard.propTypes = {
  checked: PropTypes.bool,
  desc: PropTypes.object,
  id: PropTypes.number,
  name: PropTypes.object,
  /**
   * If `true`, enables tracking and logging functionality
   */
  tracking: PropTypes.bool.isRequired,
  uiCat: PropTypes.number,
  uiId: PropTypes.number,
  uiOrder: PropTypes.number,
}

SongCard.defaultProps = {
  checked: false,
  tracking: false,
}

export default SongCard
