import fetch from 'isomorphic-fetch'
import {
    OK,
    USER_LOGIN_API,
    USER_LOGOUT_API,
    ORGANIZE_INFO_API,
    LESSON_INFO_API,
    TEAM_INFO_API
} from '../constants/api'
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    SET_ADMIN,
    SET_DOCTOR,
    SET_DOCTORASSISTANT
} from '../constants/ActionTypes'
import { toastr } from 'react-redux-toastr'

export const setAdmin = () => {
    return {
        type: SET_ADMIN
    }
}

export const setDoctor = () => {
    return {
        type: SET_DOCTOR
    }
}

export const setDoctorAssistant = () => {
    return {
        type : SET_DOCTORASSISTANT
    }
}

export const checkAdmin = () => {
    return (dispatch,getState) => {
        const user =  getState().auth.user
        return fetch(`${ORGANIZE_INFO_API}?key=${user.id}&token=${user.token}&uid=${user.id}`)
        .then(response => {
            if(response.ok) {
                return response.json()
            }else{
                throw new Error(response.statusText)
            }
        }).then( data => {
            if(data.code === OK && data.count > 0){
                dispatch(setAdmin())
            }else{
                throw new Error(data.msg)
            }
        }).catch(error => {
            toastr.error(error.message)
        })

    }
}

export const checkDoctor = () => {
    return (dispatch,getState) => {
        const user = getState().auth.user
        return fetch(`${LESSON_INFO_API}?key=${user.id}&token=${user.token}&uid=${user.id}`)
        .then(response => {
            if(response.ok) {
                return response.json()
            }else{
                throw new Error(response.statusText)
            }
        }).then( data => {
            if(data.code === OK){
                if(data.count > 0){
                    dispatch(setDoctor())
                }
            }else{
                throw new Error(data.msg)
            }
        }).catch(error => {
            toastr.error(error.message)
        })
    }
}

export const checkDoctorAssistant = () => {
    return (dispatch,getState) => {
        const user = getState().auth.user
        return fetch(`${TEAM_INFO_API}?key=${user.id}&token=${user.token}&uid=${user.id}`)
        .then(response => {
            if(response.ok) {
                return response.json()
            }else{
                throw new Error(response.statusText)
            }
        }).then( data => {
            if( data.code === OK ){
                if(data.count > 0){
                    dispatch(setDoctorAssistant())
                }
            }else{
                throw new Error(data.msg)
            }
        }).catch(error => {
            toastr.error(error.message)
        })
    }
}
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
        mobile: payload.mobile,
        id: payload.id,
        token: payload.token
    }
}

export const loginFailure = error => {
    return {
        type: LOGIN_FAIL,
        error
    }
}

export const login = (mobile, pwd) => {
    return (dispatch, getState) => {
        dispatch(startLogin())
        return fetch(USER_LOGIN_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `mobile=${mobile}&pwd=${pwd}&login_type=2`
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => {
            if (data.code === OK) {
                dispatch(loginSuccess({
                    mobile: mobile,
                    id: data.key,
                    token: data.token
                }))
                Promise.all([
                    dispatch(checkAdmin()),
                    dispatch(checkDoctor()),
                    dispatch(checkDoctorAssistant())])
                    .then(() => {
                        localStorage['__INITIAL_STATE__'] = JSON.stringify({
                            auth: getState().auth
                        })
                })
                return {
                    ok: true
                }
            } else {
                throw new Error(data.msg)
            }
        }).catch(error => {
            dispatch(loginFailure(error.message))
            return {
                msg: error.message
            }
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
        return fetch(`${USER_LOGOUT_API}?key=${id}&token=${token}`).then(response => {
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
            return {
                msg: error.message
            }
        })
    }
}