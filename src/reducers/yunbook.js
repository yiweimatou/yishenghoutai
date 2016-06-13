import {
	YUNBOOK_ADD_REQUEST,
	YUNBOOK_ADD_SUCCESS,
	YUNBOOK_ADD_FAILURE,
	YUNBOOK_GET_REQUEST,
	YUNBOOK_GET_SUCCESS,
	YUNBOOK_GET_FAILURE,
	YUNBOOK_LIST_SUCCESS,
	YUNBOOK_LIST_REQUEST,
	YUNBOOK_LIST_FAILURE,
	YUNBOOK_EDIT_REQUEST,
	YUNBOOK_EDIT_SUCCESS,
	YUNBOOK_EDIT_FAILURE
} from 'constants/ActionTypes'

const initialState = {
	errorMessage:'',
	loading:false,
	list:[],
	detail:null
}

const ACTION_HANDLERS = {
	[YUNBOOK_ADD_REQUEST]: state => ({
		...state,
		loading:true
	}),
	[YUNBOOK_ADD_SUCCESS] : state => ({
		...state,
		loading:false,
		errorMessage:''
	}),
	[YUNBOOK_ADD_FAILURE] : (state,action) => ({
		...state,
		loading:false,
		errorMessage:action.errorMessage
	})
}

const yunbook = (state = initialState ,action ) => {
	const handler = ACTION_HANDLERS[action.type]
	return handler?handler(state,action):state
}

export default yunbook