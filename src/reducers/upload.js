import {
    UPLOAD_COVER_REQUEST,
	UPLOAD_COVER_SUCCESS,
	UPLOAD_COVER_FAILURE,
	UPLOAD_YUNBOOK_REQUEST,
    UPLOAD_YUNBOOK_SUCCESS,
    UPLOAD_YUNBOOK_FAILURE
} from '../constants/ActionTypes'

const initialState = {
    loading:false,
    errorMessage:''
}

const ACTION_HANDLERS = {
	[UPLOAD_COVER_REQUEST] : state => ({
		...state,
		loading:true
	}),
	[UPLOAD_COVER_SUCCESS] : state => ({
		...state,
		loading:false,
		errorMessage:''
	}),
	[UPLOAD_COVER_FAILURE] : (state,action) => ({
		...state,
		loading:false,
		errorMessage:action.errorMessage
	}),
	[UPLOAD_YUNBOOK_REQUEST] : state => ({
		...state,
		loading:true
	}),
	[UPLOAD_YUNBOOK_SUCCESS] : state => ({
		...state,
		loading:false,
		errorMessage:''
	}),
	[UPLOAD_YUNBOOK_FAILURE] : (state,action) => ({
		...state,
		loading:false,
		errorMessage:action.errorMessage
	})
}

const upload = ( state = initialState , action ) => {
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state,action) : state
}

export default upload