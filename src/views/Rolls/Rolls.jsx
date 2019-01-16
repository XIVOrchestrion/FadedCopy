import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getProgress, updateTrack } from '../../store/dashboard'

import { SongCard, Alert } from '../../components'

class Rolls extends React.Component {
  componentDidMount() {
    this.props.getProgress()
  }

  handleChange = (e) => {
    console.log(e.target, e.target.checked)
    this.props.updateTrack(e.target.id, e.target.checked)
  }

  render() {
    const {
      activeCharacter,
      authenticated,
      status,
      obtained,
      songs,
    } = this.props

    if (!status)
      return (
        <main>
          <span>Loading songs</span>
        </main>
      )

    return (
      <main>
        {!authenticated &&
          <Alert type="message">
            Start tracking your progress by signing up for an account or logging in!
          </Alert>
        }

        {(authenticated && !activeCharacter) &&
          <Alert>
            You don't have a character assigned to your account yet.
          </Alert>
        }

        {songs.map(item => {
          let extraProps = {}
          if (activeCharacter) {
            const isChecked = obtained[activeCharacter] ? obtained[activeCharacter].includes(item.id.toString()) : false
            extraProps = {
              checked: isChecked,
              handleChange: this.handleChange,
              tracking: true,
            }
          }

          return (
            <SongCard
              key={item.id}
              {...item}
              {...extraProps}
            />
          )
        })}
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    activeCharacter,
    authenticated,
    error,
  } = state.app

  const {
    isFetching,
    lastUpdated,
    songs,
    status,
    obtained
  } = state.dashboard

  return {
    activeCharacter,
    authenticated,
    error,
    isFetching,
    lastUpdated,
    songs,
    status,
    obtained,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProgress: bindActionCreators(getProgress, dispatch),
  updateTrack: bindActionCreators(updateTrack, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Rolls)
