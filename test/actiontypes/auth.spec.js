import test from 'ava'
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from '../../src/constants/actiontypes/auth'

test('should return login fail actiontype', t => {
    t.is(LOGIN, 'LOGIN')
})

test('should return login success actiontype', t => {
    t.is(LOGIN_SUCCESS, 'LOGIN_SUCCESS')
})

test('should return login fail actiontype', t => {
    t.is(LOGIN, 'LOGIN')
})

test('should return login actiontype', t => {
    t.is(LOGIN_FAIL, 'LOGIN_FAIL')
})

test('should return logout actiontype', t => {
    t.is(LOGOUT, 'LOGOUT')
})

test('should return logout success actiontype', t => {
    t.is(LOGOUT_SUCCESS, 'LOGOUT_SUCCESS')
})

test('should return logout fail actiontype', t => {
    t.is(LOGOUT_FAIL, 'LOGOUT_FAIL')
})