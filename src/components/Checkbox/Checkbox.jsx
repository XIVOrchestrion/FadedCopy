import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Checkbox.module.scss'

import { icon } from '../'
import Icon from '../Icon';

class Checkbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
    }
    this.isControlled = props.checked != null
    if (!this.isControlled)
      this.state.checked = false
  }

  handleInputChange = e => {
    const checked = e.target.checked

    if (!this.isControlled)
      this.setState({ checked })

    if (this.props.handleChange)
      this.props.handleChange(e, checked)
  }

  render() {
    const {
      checked: checkedProp,
      disabled,
      id,
      label,
      required,
      type,
    } = this.props

    const checked = this.isControlled ? checkedProp : this.state.checked

    return (
      <div className={styles.root}>
        {label &&
          <div>
            { label }
          </div>
        }

        <span className={classNames(styles.checkbox, {
          [`${styles.checked}`]: checked,
        })}>

          {checked &&
            <Icon
              classes={styles.icon}
              icon="tick"
              size="small"
              viewBox={[24, 24]}
            />
          }
          <input
            checked={checkedProp}
            className={styles.input}
            disabled={disabled}
            id={id}
            name={id}
            onBlur={() => this.setState({ focused: false })}
            onChange={this.handleInputChange}
            onFocus={() => this.setState({ focused: true })}
            required={required}
            type={type}
          />
        </span>
      </div>
    )
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  helperText: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['checkbox', 'radio']),
}

Checkbox.defaultProps = {
  disabled: false,
  required: false,
  type: 'checkbox'
}

export default Checkbox
