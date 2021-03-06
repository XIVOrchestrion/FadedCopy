import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getProgress, updateTrack } from '../../store/dashboard'
import { categories } from '../../data'
import { SongCard, Alert } from '../../components'
import styles from './Rolls.module.scss'

class Rolls extends React.Component {
  componentDidMount() {
    this.props.getProgress()
  }

  handleChange = (e) => this.props.updateTrack(e.target.id, e.target.checked)

  render() {
    const {
      activeCharacter,
      authenticated,
      displaySongs,
      status,
      obtained,
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

        {Array.from(displaySongs).map(([key, value]) => {
          // Annoying workaround for no KEY information
          key = key === null ? 0 : key
          return (
          <section key={key}>
            <h2 className={styles.sectionTitle}>
              {categories[key].en}
            </h2>
            {value.map(item => {
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
                  key={item.name.en.replace(/ /g, '')}
                  {...item}
                  order={item.uiOrder}
                  {...extraProps}
                />
              )
            })}
          </section>
        )})}
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
    displaySongs,
    isFetching,
    lastUpdated,
    status,
    obtained
  } = state.dashboard

  return {
    activeCharacter,
    authenticated,
    displaySongs,
    error,
    isFetching,
    lastUpdated,
    status,
    obtained,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProgress: bindActionCreators(getProgress, dispatch),
  updateTrack: bindActionCreators(updateTrack, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Rolls)
