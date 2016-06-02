import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED
} from '../constants/actiontypes/auth.js'

const initalState = {
    user: null,
    loading: false,
    status: '',
    error: ''
}
const ACTION_HANDLERS = {
    [LOGIN]: state => ({
        ...state,
        loading: true,
        status:LOGIN
    }),
    [LOGIN_SUCCESS]: (state, action) => ({
        ...state,
        status: AUTHENTICATED,
        loading: false,
        user: {
            id: action.id,
            token: action.token
        }
    }),
    [LOGIN_FAIL]: (state, action) => ({
        ...state,
        error: action.error,
        loading: false,
        status:LOGIN_FAIL
    }),
    [LOGOUT]: state => ({
        ...state,
        loading: true,
        status:LOGOUT
    }),
    [LOGOUT_SUCCESS]: state => ({
        ...state,
        status: LOGOUT,
        loading: false
    }),
    [LOGOUT_FAIL]: (state, action) => ({
        ...state,
        loading: false,
        error: action.error
    })
}
const auth = (state = initalState, action) => {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

export default auth