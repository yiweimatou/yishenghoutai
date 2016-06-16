import {
    ORGANIZELESSON_LIST_REQUEST,
    ORGANIZELESSON_LIST_SUCCESS,
    ORGANIZELESSON_LIST_FAILURE,
    ORGANIZELESSON_EDIT_REQUEST,
    ORGANIZELESSON_EDIT_SUCCESS,
    ORGANIZELESSON_EDIT_FAILURE,
    ORGANIZELESSON_SLIST_SUCCESS
} from 'constants/ActionTypes'

const initialState = {
    loading:false,
    list :[],
    slist:[],
    offset:1,
    limit:5
}

const ACTION_HANDLER = {
    [ORGANIZELESSON_SLIST_SUCCESS] : (state,action) => ({
        ...state,
        loading:false,
        slist:action.list
    }),
    [ORGANIZELESSON_EDIT_REQUEST] : state => ({
        ...state,
        loading:true
    }),
    [ORGANIZELESSON_EDIT_SUCCESS]: (state,action) => ({
        ...state,
        loading:false,
        list : state.list.filter( item => item.id!==action.id )
    }),
    [ORGANIZELESSON_EDIT_FAILURE]: state => ({
        ...state,
        loading:false
    }),
    [ORGANIZELESSON_LIST_REQUEST]: state => ({
        ...state,
        loading:true
    }),
    [ORGANIZELESSON_LIST_SUCCESS]:(state,action) => ({
        ...state,
        loading:false,
        list:action.list
    }),
    [ORGANIZELESSON_LIST_FAILURE]: state => ({
        ...state,
        loading:false
    })
}

const organizeLesson = ( state = initialState,action ) => {
    const handler = ACTION_HANDLER[action.type]
    return handler?handler(state,action):state
}

export default organizeLesson

