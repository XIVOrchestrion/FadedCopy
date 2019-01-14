import React from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import { SettingsTemp } from '../../templates'
import { Character } from '../../components'

const Settings = ({
  user,
  userData
}) => {
  return(
    <SettingsTemp>
      <div>
        {userData && userData.characters &&
          <ul>
            {Object.keys(userData.characters).map(key => {
              const char = userData.characters[key]
              return (
                <li key={char.id}>
                  <Character
                    avatar={char.avatar}
                    id={char.id}
                    name={char.name}
                    server={char.server}
                  />

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
  user: state.app.user,
  userData: state.app.userData,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

