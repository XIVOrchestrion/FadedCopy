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

    console.log(this.props.songs)

    return (
      <main>
        <h1>Hello DASHBOARD world</h1>
        {this.props.songs.map(item => (
          <SongCard
            key={item.id}
            {...item}
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
