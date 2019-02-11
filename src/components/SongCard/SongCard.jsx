import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './SongCard.module.scss'

import { Checkbox } from '../'

const SongCard = ({
  checked,
  desc,
  handleChange,
  id,
  name,
  order,
  tracking,
  uiCat,
  uiId,
  uiOrder,
}) => {

  return(
    <div
      className={
        classNames(styles.root, {
          [styles.row]: true,
          [styles.obtained]: checked,
        }
      )}
    >
      {tracking &&
        <Checkbox
          id={id}
          checked={checked}
          type="checkbox"
          handleChange={handleChange}
        />
      }
      <div className={styles.number}>
        { order === 65535 ? '-' : `${order}.` }
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
  /**
   * If `true`, the song is marked as obtained.
   */
  checked: PropTypes.bool,
  /**
   * Short summary of how to obtain the song.
   */
  desc: PropTypes.object,
  /**
   * Unique id for the song.
   */
  id: PropTypes.number,
  /**
   * Song name.
   */
  name: PropTypes.object,
  order: PropTypes.number,
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
