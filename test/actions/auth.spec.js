import test from 'ava'
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from '../../src/constants/actiontypes/auth.js'
import {
    startLogin,
    loginSuccess,
    loginFail,
    login,
    startLogout,
    logoutFail,
    logoutSuccess,
    logout
} from '../../src/actions/auth.js'
import {
    OK,
    API_DOMAIN
} from '../../src/constants/api.js'
import mockStore from '../mockStore.js'
import nock from 'nock'

test.afterEach('nock clean', () => {
    nock.cleanAll()
})

test('should create an action to login', t => {
    t.deepEqual(startLogin(), {
        type: LOGIN
    })
})

test('should create an action login success', t => {
    const expect = {
        type: LOGIN_SUCCESS,
        id: 2,
        token: 'token'
    }
    t.deepEqual(loginSuccess({
        id: 2,
        token: 'token'
    }), expect)
})

test('should create an action login fail', t => {
    const expect = {
        type: LOGIN_FAIL,
        error: 'login error'
    }
    t.deepEqual(loginFail('login error'), expect)
})

test('should create an action of login success when login has been done', t => {
    const account = 'zhangruofan'
    const pwd = '123456'
    const store = mockStore({
        id: 0,
        token: ''
    })
    const expectActions = [{
        type: LOGIN
    }, {
        type: LOGIN_SUCCESS,
        id: 2,
        token: 'token'
    }]
    nock(`${API_DOMAIN}`)
        .post('/admin/login')
        .reply(200, {
            code: OK,
            key: 2,
            token: 'token'
        })
    return store.dispatch(login(account, pwd)).then(() => {
        t.deepEqual(store.getActions(), expectActions)
    })
})

test('should create an action of login failure when login has been done', t => {
    const account = 'zhangruofan'
    const pwd = '1234567'
    const store = mockStore({
        id: 0,
        token: ''
    })
    const expectActions = [{
        type: LOGIN
    }, {
        type: LOGIN_FAIL,
        error: '密码错误'
    }]
    nock(`${API_DOMAIN}`)
        .post('/admin/login')
        .reply(200, {
            code: -1,
            msg: '密码错误'
        })
    return store.dispatch(login(account, pwd)).then(() => {
        t.deepEqual(store.getActions(), expectActions)
    })
})

test('should create an action logout', t => {
    t.deepEqual(startLogout(), {
        type: LOGOUT
    })
})

test('should create an action logout success', t => {
    t.deepEqual(logoutSuccess(), {
        type: LOGOUT_SUCCESS
    })
})

test('should create an action logout failure', t => {
    t.deepEqual(logoutFail('error'), {
        type: LOGOUT_FAIL,
        error: 'error'
    })
})

test('should create an action of logout success when login has been done', t => {
    const store = mockStore({})
    const expectActions = [{
        type: LOGOUT
    }, {
        type: LOGOUT_SUCCESS
    }]
    nock(`${API_DOMAIN}`)
        .get('/admin/logout').query({
            key: 2,
            token: 'token'
        })
        .reply(200, {
            code: OK
        })
    return store.dispatch(logout(2, 'token')).then(() => {
        t.deepEqual(store.getActions(), expectActions)
    })
})

test('should create an action of logout failure when login has been done', t => {
    const store = mockStore({})
    const expectActions = [{
        type: LOGOUT
    }, {
        type: LOGOUT_FAIL,
        error: '令牌验证出错'
    }]
    nock(`${API_DOMAIN}`)
        .get('/admin/logout').query({
            key: 2,
            token: 'token'
        })
        .reply(200, {
            code: -1,
            msg: '令牌验证出错'
        })
    return store.dispatch(logout(2, 'token')).then(() => {
        t.deepEqual(store.getActions(), expectActions)
    })
})