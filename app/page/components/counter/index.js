import React, { Component, PropTypes } from 'react'
require('./index.scss');

export default class Counter extends Component {
    render() {
        const { value, onIncreaseClick, onDcrementClick } = this.props
        return (
            <div>
                <span>{value}</span>
                <button onClick={onIncreaseClick}>Increase</button>
                <button onClick={onDcrementClick}>Dcrement</button>
            </div>
        )
    }
}
