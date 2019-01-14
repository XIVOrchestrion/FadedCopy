import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchSongsIfNeeded } from '../../store/dashboard'

import { SongCard } from '../../components'

class Rolls extends React.Component {
  componentDidMount() {
    this.props.fetchSongsIfNeeded()
  }

  render() {

    if (!this.props.songs)
      return (
        <main>
          <span>Loading songs</span>
        </main>
      )

    return (
      <main>
        {this.props.songs.map(item => (
          <SongCard
            key={item.id}
            {...item}
            tracking
          />
        ))}
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    error,
    isFetching,
    lastUpdated,
    songs,
  } = state.dashboard

  return {
    error,
    isFetching,
    lastUpdated,
    songs,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchSongsIfNeeded: bindActionCreators(fetchSongsIfNeeded, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Rolls)
