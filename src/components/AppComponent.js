import React from 'react'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import Snackbar from 'material-ui/Snackbar'

import Button from './ButtonComponent'
import '../css/app.css'

export default ({ buttons, firstDigit, operation, secondDigit, isShowNotification, onButtonClick, onCloseNotification }) => {

    const displayMinWidth = 25 * (((firstDigit && firstDigit.length) || 0) + ((secondDigit && secondDigit.length) || 0)) + 15

    return (
        <div className="App">

            <AppBar title="Calculator" />

            <Paper className="box" zDepth={2} >
                {/* Display panel */}
                <Paper className="output" zDepth={1} style={{ minWidth: displayMinWidth }}>
                    <label>
                        {firstDigit}{operation && operation.text}{secondDigit}
                    </label>
                </Paper>
                {/* All buttons*/}
                {
                    buttons.map((button, i) =>
                        <Button key={i} {...button} onButtonClick={() => { onButtonClick(button) }} />)
                }
            </Paper>
            {/* Snackbar notification show in case of error */}
            <Snackbar
                open={isShowNotification}
                message="Bad operation"
                autoHideDuration={4000}
                onRequestClose={onCloseNotification} />
        </div >
    )
}
