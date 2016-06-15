import {
    SECTION_ADD_REQUEST,
    SECTION_ADD_SUCCESS,
    SECTION_ADD_FAILURE
} from 'constants/ActionTypes'

const initialState = {
    loading:false,
    errorMessage: ''
}

const ACTION_HANDLER ={
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