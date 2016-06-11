import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    SET_ADMIN,
    SET_DOCTOR,
    SET_DOCTORASSISTANT,
    AUTHENTICATED
} from '../constants/ActionTypes'

const initialState = {
    user: {
        mobile:''
    },
    loading: false,
    admin:false,
    doctor:false,
    doctorAssistant:false,
    status: '',
    error: ''
}
const ACTION_HANDLERS = {
    [SET_ADMIN]: state => ({
        ...state,
        admin:true
    }),
    [SET_DOCTOR] : state => ({
        ...state,
        doctor:true
    }),
    [SET_DOCTORASSISTANT] : state => ({
        ...state,
        doctorAssistant:true
    }),
    [LOGIN]: state => ({
        ...state,
        loading: true,
        status:LOGIN
    }),
    [LOGIN_SUCCESS]: (state, action) => ({
        ...state,
        status: AUTHENTICATED,
        loading: false,
        error:'',
        user: {
            mobile:action.mobile,
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
const auth = (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

export default auth