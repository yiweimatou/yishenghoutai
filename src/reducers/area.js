import {
	AREA_LIST_REQUEST,
	AREA_LIST_SUCCESS,
	AREA_LIST_FAILURE
} from 'constants/ActionTypes'

const initialState = {
	list:null,
	loading:false,
	errorMessage:'',
	[4]:[],
	[5]:[],
	[6]:[]
}

const ACTION_HANDLERS = {
	[AREA_LIST_REQUEST] : state => ({
		...state,
		loading:true
	}),
	[AREA_LIST_SUCCESS] : (state,action) => ({
		...state,
		loading:false,
		list : Object.assign({},state.list,{
			[action.pid]:action.list			
		}),
		[action.zoom]:action.list
	}),
	[AREA_LIST_FAILURE] : (state,action) => ({
		...state,
		loading:false,
		errorMessage:action.errorMessage
	})
}

const area = (state = initialState, action) => {
	const handler = ACTION_HANDLERS[action.type]
	return handler?handler(state,action):state
}

export default area