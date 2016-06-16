import {
    GET_LESSONTEAM_LIST_REQUEST,
    GET_LESSONTEAM_LIST_SUCCESS,
    GET_LESSONTEAM_LIST_FAILURE,
    REMOVE_LESSONTEAM_SUCCESS,
    EDIT_LESSONTEAM_SUCCESS,
    GET_LESSONTEAM_INVITED_LIST_SUCCESS
} from '../constants/ActionTypes'

const initialState = {
    list: [],
    invitedList: [],
    loading: false
}

const ACTION_HANDLER = {
    [GET_LESSONTEAM_INVITED_LIST_SUCCESS]:(state,action)=>({
        ...state,
        invitedList:action.list
    }),
    [EDIT_LESSONTEAM_SUCCESS]:(state,action) => ({
        ...state,
        invitedList:state.invitedList.filter(item=>item.id!==action.id)
    }),
    [GET_LESSONTEAM_LIST_REQUEST]: state => ({
        ...state,
        loading: true
    }),
    [GET_LESSONTEAM_LIST_SUCCESS]: (state, action) => ({
        ...state,
        loading: false,
        list: action.list
    }),
    [GET_LESSONTEAM_LIST_FAILURE]: state => ({
        ...state,
        loading: false
    }),
    [REMOVE_LESSONTEAM_SUCCESS]:(state,action) => ({
        ...state,
        list:state.list.filter(item => item.id!==action.id)
    })
}

const lessonTeam = (state = initialState, action) => {
    const handler = ACTION_HANDLER[action.type]
    return handler ? handler(state, action) : state
}

export default lessonTeam