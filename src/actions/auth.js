import fetch from 'isomorphic-fetch'
import {
    OK,
    ADMIN_LOGIN_API,
    ADMIN_LOGOUT_API
} from '../constants/api'
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from '../constants/actiontypes/auth'
/**
 * login
 */
export const startLogin = () => {
    return {
        type: LOGIN
    }
}

export const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        id: payload.id,
        token: payload.token
    }
}

export const loginFail = error => {
    return {
        type: LOGIN_FAIL,
        error
    }
}

export const login = (account, pwd) => {
        return dispatch => {
            dispatch(startLogin())
            return fetch(ADMIN_LOGIN_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `account=${account}&pwd=${pwd}`
            }).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.statusText)
                }
            }).then(data => {
                if (data.code === OK) {
                    dispatch(loginSuccess({
                        id: data.key,
                        token: data.token
                    }))
                    return data
                } else {
                    throw new Error(data.msg)
                }
            }).catch(error => {
                dispatch(loginFail(error.message))
                return error
            })
        }
    }
    /**
     * logout
     */
export const startLogout = () => {
    return {
        type: LOGOUT
    }
}

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const logoutFail = error => {
    return {
        type: LOGOUT_FAIL,
        error
    }
}
export const logout = (id, token) => {
    return dispatch => {
        dispatch(startLogout())
        return fetch(`${ADMIN_LOGOUT_API}?key=${id}&token=${token}`
        // , {
        //     // method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     body: `key=${id}&token=${token}`
        // }
        ).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => {
            if (data.code === OK) {
                dispatch(logoutSuccess())
                return data
            } else {
                throw new Error(data.msg)
            }
        }).catch(error => {
            dispatch(logoutFail(error.message))
            return error
        })
    }
}