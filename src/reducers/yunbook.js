import {
	YUNBOOK_ADD_REQUEST,
	YUNBOOK_ADD_SUCCESS,
	YUNBOOK_ADD_FAILURE,
	// YUNBOOK_GET_REQUEST,
	YUNBOOK_GET_SUCCESS,
	// YUNBOOK_GET_FAILURE,
	YUNBOOK_LIST_SUCCESS,
	YUNBOOK_LIST_REQUEST,
	YUNBOOK_LIST_FAILURE,
	// YUNBOOK_EDIT_REQUEST,
	YUNBOOK_EDIT_SUCCESS,
	// YUNBOOK_EDIT_FAILURE,
	YUNBOOK_INFO_REQUEST,
	YUNBOOK_INFO_SUCCESS,
	YUNBOOK_INFO_FAILURE,
	MYYUNBOOK_LIST_SUCCESS,
	MYYUNBOOK_INFO_SUCCESS,
	SET_YUNBOOK_LIST_OFFSET,
	SET_MYYUNBOOK_LIST_OFFSET
} from 'constants/ActionTypes'

const initialState = {
	errorMessage:'',
	loading:false,
	list:[],
	myList:[],
	detail:null,
	myTotal:0,
	total : 0,
	limit:8,
	myLimit:8,
	offset:1,
	myOffset:1
}

const ACTION_HANDLERS = {
	[YUNBOOK_EDIT_SUCCESS]:(state,action)=>({
		...state,
		list:state.list.map(item=>{
			if( item.bid === action.yunbook.bid ){
				return Object.assign({},item,yunbook)
			}
			return item
		}),
		myList:state.myList.map(item=>{
			if( item.bid === action.yunbook.bid ){
				return Object.assign({},item,yunbook)
			}
			return item
		})
	}),
	[YUNBOOK_GET_SUCCESS]:(state,action) => ({
		...state,
		detail:action.yunbook
	}),
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
	}),
	[YUNBOOK_LIST_SUCCESS] : (state,action) => ({
		...state,
		loading:false,
		errorMessage:'',
		list:state.list.concat(action.list)
	}),
	[MYYUNBOOK_LIST_SUCCESS] : (state,action) => ({
		...state,
		loading:false,
		errorMessage:'',
		myList:state.myList.concat(action.list)
	}),
	[YUNBOOK_LIST_REQUEST]: state => ({
		...state,
		loading:true
	}),
	[YUNBOOK_LIST_FAILURE] : (state,action) => ({
		...state,
		loading:false,
		errorMessage:action.errorMessage
	}),
	[YUNBOOK_INFO_REQUEST] : state => ({
		...state,
		loading:true
	}),
	[YUNBOOK_INFO_SUCCESS] : (state,action) => ({
		...state,
		loading:false,
		errorMessage:'',
		total : action.total
	}),
	[MYYUNBOOK_INFO_SUCCESS] : (state,action) => ({
		...state,
		loading:false,
		errorMessage:'',
		myTotal : action.total
	}),
	[YUNBOOK_INFO_FAILURE]: (state,action) => ({
		...state,
		loading:false,
		errorMessage:action.errorMessage
	}),
	[SET_YUNBOOK_LIST_OFFSET]:(state,action) => ({
		...state,
		offset:action.offset
	}),
	[SET_MYYUNBOOK_LIST_OFFSET]:(state,action) => ({
		...state,
		myOffset:action.offset
	})
}

const yunbook = (state = initialState ,action ) => {
	const handler = ACTION_HANDLERS[action.type]
	return handler?handler(state,action):state
}

export default yunbook