import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  removeCharacter,
} from '../../store/settings'

import { SettingsTemp } from '../../templates'
import { Button, Character } from '../../components'
import styles from './Settings.module.scss'

const Settings = ({
  characters,
  user,
  userData,
  ...props
}) => {
  return(
    <SettingsTemp>
      <div>
        <h2>
          Profile
        </h2>
        <h3>
          My characters
        </h3>

        <Button tag="link" to="/settings/profile/new">
          Add Character
        </Button>

        {characters &&
          <ul className={styles.characterList}>
            {Object.keys(characters).map(key => {
              const char = characters[key]
              return (
                <li
                  key={char.id}
                  className={styles.characterEntry}
                >
                  <Character
                    classes={styles.characterField}
                    avatar={char.avatar}
                    id={char.id}
                    name={char.name}
                    server={char.server}
                  />
                  <span className={styles.characterField}>
                    {char.added ? char.added.toDate().toUTCString() : ''}
                  </span>
                  <Button
                    classes={styles.characterField}
                    handleClick={() => props.removeCharacter(char.id)}
                  >
                    Delete character
                  </Button>
                </li>
              )
            })}
          </ul>
        }
      </div>
    </SettingsTemp>
  )
}

const mapStateToProps = (state) => ({
  characters: state.app.characters,
  user: state.app.user,
  userData: state.app.userData,
})

const mapDispatchToProps = (dispatch) => ({
  removeCharacter: bindActionCreators(removeCharacter, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

