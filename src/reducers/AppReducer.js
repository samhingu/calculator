import * as t from '../actionTypes'

const initialState = {
    firstDigit: "0",
    secondDigit: null,
    operation: null,
    clearFirstDigit: false,
    isShowNotification: false,
    buttons: [
        { label: "1" },
        { label: "2" },
        { label: "3" },
        { label: "/", operation: t.DIVIDE },
        { label: "4" },
        { label: "5" },
        { label: "6" },
        { label: "-", operation: t.MINUS },
        { label: "7" },
        { label: "8" },
        { label: "9" },
        { label: "+", operation: t.PLUS },
        { label: "0" },
        { label: ".", operation: t.DOT },
        { label: "*", operation: t.MULTIPLY },
        { label: "=", operation: t.EVALUATE },
        { label: "CLEAR", operation: t.CLEAR }
    ]
}
export default (state = initialState, action) => {
    switch (action.type) {
        case t.DIGIT:
            // if operation selected then append Digit in secondDigit else firstDigit variable
            if (state.operation) {
                return Object.assign({}, state, {
                    secondDigit: state.secondDigit === "0" ? action.text
                        : (state.secondDigit || '') + action.text
                })
            } else {
                return Object.assign({}, state, {
                    firstDigit: state.isClearFirstDigit || state.firstDigit === "0" ? action.text
                        : (state.firstDigit || '') + action.text
                })
            }
        case t.DOT:
            // if operation selected then append Dot(.) in secondDigit else firstDigit variable
            // dot should be entered only once
            if (state.operation) {
                if (!state.secondDigit || state.secondDigit.indexOf('.') === -1) {
                    return Object.assign({}, state, {
                        secondDigit: (state.secondDigit || '') + action.text
                    })
                }
            } else if (!state.firstDigit || state.firstDigit.indexOf('.') === -1) {
                return Object.assign({}, state, {
                    firstDigit: (state.firstDigit || '') + action.text
                })
            }
            return state
        case t.DIVIDE:
        case t.MULTIPLY:
        case t.PLUS:
            if (state.firstDigit) {
                return Object.assign({}, state, {
                    operation: action
                })
            }
            return state
        case t.MINUS:
            if (!state.firstDigit) {
                return Object.assign({}, state, {
                    firstDigit: action.text
                })
            }
            if (!state.operation) {
                return Object.assign({}, state, {
                    operation: action
                })
            }
            if (!state.secondDigit) {
                return Object.assign({}, state, {
                    secondDigit: action.text
                })
            }
            return state

        case t.EVALUATE:
            if (state.operation && state.secondDigit) {
                var result = 0
                switch (state.operation.type) {
                    case t.PLUS:
                        result = parseFloat(state.firstDigit) + parseFloat(state.secondDigit)
                        break
                    case t.MINUS:
                        result = parseFloat(state.firstDigit) - parseFloat(state.secondDigit)
                        break
                    case t.MULTIPLY:
                        result = parseFloat(state.firstDigit) * parseFloat(state.secondDigit)
                        break
                    case t.DIVIDE:
                        result = parseFloat(state.firstDigit) / parseFloat(state.secondDigit)
                        break
                }
                return Object.assign({}, state, {
                    firstDigit: result.toString(),
                    isShowNotification: isNaN(result) || result === Infinity,
                    operation: null,
                    secondDigit: null,
                    isClearFirstDigit: action.isClearFirstDigit
                })
            }

            // clear operation if second digit not entered
            if (!state.secondDigit) {
                return Object.assign({}, state, {
                    operation: null,
                    isClearFirstDigit: action.isClearFirstDigit
                })
            }
            return state

        case t.CLOSE_NOTIFICATION:
        case t.CLEAR:
            return Object.assign({}, state, {
                isShowNotification: false,
                firstDigit: "0",
                operation: null,
                secondDigit: null
            })

        default:
            return state
    }
}