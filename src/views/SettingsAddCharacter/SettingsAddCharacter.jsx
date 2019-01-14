import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { SettingsTemp } from '../../templates'
import { Character } from '../../components'
import {
  checkCharacterToken,
  searchCharacter,
  selectCharacter,
} from '../../store/settings'
import { servers } from '../../data'
import styles from './SettingsAddCharacter.module.scss'

class SettingsAddCharacter extends React.Component {
  constructor(props) {
    super(props)

    this.characterName = React.createRef()
    this.serverName = React.createRef()
    this.authToken = React.createRef()
  }

  handleSearch = (e) => {
    e.preventDefault()

    const name = this.characterName.current.value
    const server = this.serverName.current.value

    if (name.length < 4)
      return

    this.props.searchCharacter(name, server)
  }

  handleSelect = (character) => this.props.selectCharacter(character)

  handleTokenCheck = async () => {
    this.props.checkCharacterToken(this.authToken.current.value)

    return
  }

  render() {
    const {
      character,
      error,
      loaded,
      pass,
      results,
      searching,
      token,
      verified
    } = this.props

    if (verified) return <Redirect to={'/settings/profile'} />

    return(
      <SettingsTemp>
        {error &&
          <span>
            { error }
          </span>
        }
        <form onSubmit={this.handleSearch}>
          <label>
            Character Name
            <input
              id="character"
              type="text"
              ref={this.characterName}
            >
            </input>
          </label>

          <label>
            Server
            <select
              id="server"
              ref={this.serverName}
            >
              {servers.map(world => (
                <optgroup
                  key={world.id}
                  label={world.name}
                >
                  {world.servers.map(item => (
                    <option
                      key={item.id}
                      value={item.key}
                    >
                      { item.name }
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          <button type="submit">
            Search
          </button>
        </form>

        {searching && (
          <div className={styles.results}>
            {loaded ? (
              <div className={styles.character}>
                {results.length > 0 ? (
                  <ul className={styles.characterList}>
                  {results.map(item => (
                    <li
                      key={item.ID}
                      className={styles.characterPanel}
                    >
                      <button onClick={() => this.handleSelect(item)}>
                        <Character
                          avatar={item.Avatar}
                          id={item.ID}
                          name={item.Name}
                          server={item.Server}
                        />
                      </button>
                    </li>
                  ))}
                  </ul>
                ) : (
                  <span>No results found</span>
                )}
              </div>
            ) : (
              <span>
                Searching...
              </span>
            )}
          </div>
        )}

        {character &&
          <div>
            <span>
              { character.Name }
            </span>
            <span>
              { character.Server }
            </span>
            <label>
              Token
              <input
                id="authToken"
                type="text"
                value={token}
                readOnly
                ref={this.authToken}
              />
            </label>
            <button>
              Copy to clipboard
            </button>
            <button onClick={this.handleTokenCheck}>
              {pass ? (
                <span>Verified!</span>
              ) : (
                <span>Refresh</span>
              )}
            </button>
            <span>
              Edit your bio at <a href="https://eu.finalfantasyxiv.com/lodestone/my/setting/profile/" target="_blank" rel="noopener noreferrer">The Lodestone</a> to include your unique authorisation token. When you're done, return here to continue.
            </span>
          </div>
        }
      </SettingsTemp>
    )
  }
}

SettingsAddCharacter.propTypes = {
  character: PropTypes.object,
  loaded: PropTypes.bool,
  pagination: PropTypes.object,
  pass: PropTypes.bool,
  results: PropTypes.array,
  searching: PropTypes.bool,
  token: PropTypes.string,
  /**
   * If `true` the character has been successfully verified
   */
  verified: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  character: state.settings.character,
  error: state.settings.error,
  loaded: state.settings.loaded,
  pagination: state.settings.pagination,
  pass: state.settings.pass,
  results: state.settings.results,
  searching: state.settings.searching,
  token: state.settings.token,
  verified: state.settings.verified,
})

const mapDispatchToProps = (dispatch) => ({
  checkCharacterToken: bindActionCreators(checkCharacterToken, dispatch),
  searchCharacter: bindActionCreators(searchCharacter, dispatch),
  selectCharacter: bindActionCreators(selectCharacter, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsAddCharacter)
