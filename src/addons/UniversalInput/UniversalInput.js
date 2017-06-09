import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {
  AutoControlledComponent as Component,
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
} from '../../lib'

/**
 * An input that correctly handles `onChange` event with IME (Chinese Input Method Editor).
 * @see https://github.com/facebook/react/issues/3926
 */
class UniversalInput extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** The default value of the input. */
    defaultValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * Called on change.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onChange: PropTypes.func,

    /** The HTML input type. */
    type: PropTypes.string,

    /** The value of the input. */
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }

  static defaultProps = {
    as: 'input',
    type: 'text',
  }

  static autoControlledProps = [
    'value',
  ]

  static _meta = {
    name: 'UniversalInput',
    type: META.TYPES.ADDON,
  }

  handleComposition = e => (this.onComposition = e.type === 'compositionend')

  handleChange = e => {
    const value = _.get(e, 'target.value')

    this.setState({ value }, () => this.handleState(e, value))
  }

  handleRef = c => (_.invoke(this, 'props.inputRef', c))

  handleState = (e, value) => {
    if (this.onComposition) return
    _.invoke(this, 'props.onChange', e, { ...this.props, value })
  }

  render() {
    const rest = getUnhandledProps(UniversalInput, this.props)
    const ElementType = getElementType(UniversalInput, this.props)
    const { as, type, value } = this.state

    return (
      <ElementType
        {...rest}
        onChange={this.handleChange}
        onCompositionStart={this.handleComposition}
        onCompositionUpdate={this.handleComposition}
        onCompositionEnd={this.handleComposition}
        ref={this.handleRef}
        type={as === 'input' ? type : null}
        value={value}
      />
    )
  }
}

UniversalInput.create = createShorthandFactory(UniversalInput, type => ({ type }))

export default UniversalInput
