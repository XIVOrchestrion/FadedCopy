import React from 'react'
import PropTypes from 'prop-types'

const SongCard = ({
  desc,
  id,
  name,
  uiCat,
  uiId,
  uiOrder,
}) => {

  return(
    <div>
      { uiId }. { name.en }
    </div>
  )
}

SongCard.propTypes = {
  desc: PropTypes.object,
  id: PropTypes.number,
  name: PropTypes.object,
  uiCat: PropTypes.number,
  uiId: PropTypes.number,
  uiOrder: PropTypes.number,
}

export default SongCard
