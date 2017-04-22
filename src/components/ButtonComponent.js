import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

export default class extends Component {
    render() {
        const { label, operation, onButtonClick } = this.props
        const btnStyle = {
            backgroundColor: operation ?
                (operation === "EVALUATE" ? 'lightgreen' : '#e6e6e6')
                : 'white'
        }

        return <RaisedButton className="btn" buttonStyle={btnStyle} label={label} onClick={onButtonClick} />
    }
}  