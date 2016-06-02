import test from 'ava'
import auth from '../../src/reducers/auth.js'
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from '../../src/constants/actiontypes/auth.js'

const initialState = {
    islogged: false,
    islogining: false,
    islogoutting: false
}

test('should initialize with a state', t => {
    t.deepEqual(auth(undefined, {}), initialState)
})

test('should logining', t => {
    t.deepEqual(auth(initialState, {
        type: LOGIN
    }), {
        islogged: false,
        islogining: true,
        islogoutting: false
    })
})
test('should login success', t => {
    t.deepEqual(auth(initialState, {
        type: LOGIN_SUCCESS,
        id: 2,
        token: 'token'
    }), {
        islogged: true,
        islogining: false,
        islogoutting: false,
        id: 2,
        token: 'token'
    })
})

test('should login fail', t => {
    t.deepEqual(auth(initialState, {
        type: LOGIN_FAIL,
        error: 'error'
    }), {
        islogged: false,
        islogining: false,
        islogoutting: false,
        error: 'error'
    })
})

test('should logoutting', t => {
    t.deepEqual(auth(initialState, {
        type: LOGOUT
    }), {
        islogged: false,
        islogining: false,
        islogoutting: true
    })
})

test('should logout success', t => {
    t.deepEqual(auth({
        islogged: true,
        islogining: false,
        islogoutting: true
    }, {
        type: LOGOUT_SUCCESS
    }), {
        islogged: false,
        islogining: false,
        islogoutting: false
    })
})

test('should logout failure', t => {
    t.deepEqual(auth({
        islogged: true,
        islogining: false,
        islogoutting: true
    }, {
        type: LOGOUT_FAIL,
        error: 'error'
    }), {
        islogged: true,
        islogining: false,
        islogoutting: false,
        error: 'error'
    })
})