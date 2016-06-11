import {
    ORGANIZE_LIST_REQUEST,
    ORGANIZE_LIST_SUCCESS,
    ORGANIZE_LIST_FAILURE,
    ORGANIZE_EDIT_REQUEST,
    ORGANIZE_EDIT_SUCCESS,
    ORGANIZE_EDIT_FAILURE,
    ORGANIZE_GET_SUCCESS,
    ORGANIZE_GET_FAILURE,
    ORGANIZE_GET_REQUEST
} from 'constants/ActionTypes'

const initialState = {
    list: [],
    loading: false,
    errormessage: '',
    detail:null
}

const ACTION_HANDLERS = {
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