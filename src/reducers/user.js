import {
    GET_USER_SUCCESS
} from 'constants/ActionTypes'

const initialState = {
    detail: null
}

const ACTION_HANDLER = {
    [GET_USER_SUCCESS]: (state, action) => ({
        ...state,
        detail: action.user
    })
}

const user = (state = initialState, action) => {
    const handler = ACTION_HANDLER[action.type]
    return handler ? handler(state, action) : state
}

export default user