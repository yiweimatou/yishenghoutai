import {
	AREA_LIST_REQUEST,
	AREA_LIST_SUCCESS,
	AREA_LIST_FAILURE,
	SET_SELECTED_AREA_SUCCESS
} from 'constants/ActionTypes'

const initialState = {
	list:null,
	loading:false,
	errorMessage:'',
	[4]:[],
	[5]:[],
	[6]:[],
	[7]:[],
	select:[null,null,null]
}

const ACTION_HANDLERS = {
	[SET_SELECTED_AREA_SUCCESS]:(state,action)=>{
		const array = state.select.slice(0,3)
		array[action.zoom-4] = action.aid
		return {
			...state,
			select:array
		}
	},
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