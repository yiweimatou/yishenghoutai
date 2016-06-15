import {
    ORGANIZE_LIST_REQUEST,
    ORGANIZE_LIST_SUCCESS,
    ORGANIZE_MYLIST_SUCCESS,
    ORGANIZE_LIST_FAILURE,
    ORGANIZE_EDIT_REQUEST,
    ORGANIZE_EDIT_SUCCESS,
    ORGANIZE_EDIT_FAILURE,
    ORGANIZE_GET_SUCCESS,
    ORGANIZE_GET_FAILURE,
    ORGANIZE_GET_REQUEST,
    GET_ORGANIZE_INFO_SUCCESS,
    SET_ORGANIZE_LIST_OFFSET
} from 'constants/ActionTypes'

const initialState = {
    list: [],
    loading: false,
    errormessage: '',
    detail:null,
    myList : [],
    total:0,
    limit:4,
    offset:1
}

const ACTION_HANDLERS = {
    [SET_ORGANIZE_LIST_OFFSET] : (state,action) => ({
        ...state,
        offset:action.offset
    }),
    [GET_ORGANIZE_INFO_SUCCESS] : (state,action) => ({
        ...state,
        total : action.total 
    }),
    [ORGANIZE_EDIT_REQUEST] : state => ({
        ...state,
        loading:true
    }),
    [ORGANIZE_EDIT_FAILURE] : (state,action) => ({
        ...state,
        loading:false,
        errormessage:action.message
    }),
    [ORGANIZE_EDIT_SUCCESS] : (state,action) => ({
        ...state,
        loading:false,
        detail:Object.assign({},state.detail,action.organize)
    }),
    [ORGANIZE_GET_REQUEST] : state => ({
        ...state,
        loading:true
    }),
    [ORGANIZE_GET_SUCCESS] : (state,action) => ({
        ...state,
        loading:false,
        detail:action.organize
    }),
    [ORGANIZE_GET_FAILURE]:(state,action) => ({
        ...state,
        loading:false,
        errormessage:action.message
    }),
    [ORGANIZE_LIST_REQUEST]: state => ({
        ...state,
        loading: true
    }),
    [ORGANIZE_LIST_SUCCESS]: (state, action) => ({
        ...state,
        loading: false,
        list: action.list,
        errormessage: ''
    }),
    [ORGANIZE_MYLIST_SUCCESS]: (state, action) => ({
        ...state,
        loading: false,
        myList: action.list,
        errormessage: ''
    }),
    [ORGANIZE_LIST_FAILURE]: (state, action) => ({
        ...state,
        loading: false,
        errormessage: action.message
    })
}

const organize = ( state = initialState, action ) => {
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler( state, action ) : state
}

export default organize