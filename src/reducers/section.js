import {
    SECTION_ADD_REQUEST,
    SECTION_ADD_SUCCESS,
    SECTION_ADD_FAILURE,
    GET_SECTION_LIST_SUCCESS,
    SET_OFFSET_SUCCESS,
    SET_TOTAL_SUCCESS
} from 'constants/ActionTypes'

const initialState = {
    loading:false,
    errorMessage: '',
    list:[],
    offset:1,
    limit:6,
    total:0
}

const ACTION_HANDLER ={
    [SET_TOTAL_SUCCESS]:(state,action)=>({
        ...state,
        total:action.total
    }),
    [SET_OFFSET_SUCCESS]:(state,action) => ({
        ...state,
        offset:action.offset
    }),
    [GET_SECTION_LIST_SUCCESS]:(state,action) => ({
        ...state,
        list:action.list
    }),
    [SECTION_ADD_REQUEST]: state => ({
        ...state,
        loading:true
    }),
    [SECTION_ADD_SUCCESS] : state => ({
        ...state,
        loading:false,
        errorMessage:''
    }),
    [SECTION_ADD_FAILURE]: ( state,action ) => ({
        ...state,
        loading:false,
        errorMessage:action.errorMessage
    })
}
const section = (state = initialState,action ) => {
    const handler = ACTION_HANDLER[action.type]
    return handler?handler(state,action):state
}

export default section