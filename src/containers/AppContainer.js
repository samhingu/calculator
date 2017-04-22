import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as t from '../actionTypes'

import AppComponent from '../components/AppComponent'

class App extends Component {
  constructor() {
    super()
    this.onButtonClick = this.onButtonClick.bind(this)
    this.onCloseNotification = this.onCloseNotification.bind(this)
  }
  onButtonClick(buttonInfo) {
    const { secondDigit, operation, dispatch } = this.props
    if (secondDigit && operation && (buttonInfo.operation === t.PLUS || buttonInfo.operation === t.MINUS || buttonInfo.operation === t.DIVIDE || buttonInfo.operation === t.MULTIPLY)) {
      dispatch({ type: t.EVALUATE })
    }
    dispatch({
      type: buttonInfo.operation || t.DIGIT, text: buttonInfo.label,
      isClearFirstDigit: buttonInfo.operation === t.EVALUATE
    })
  }
  onCloseNotification() {
    this.props.dispatch({ type: t.CLOSE_NOTIFICATION })
  }
  render() {
    return <AppComponent
      {...this.props}
      onButtonClick={this.onButtonClick}
      onCloseNotification={this.onCloseNotification} />
  }
}

const mapStateToProps = (state) => (state)

export default connect(mapStateToProps, null)(App)
