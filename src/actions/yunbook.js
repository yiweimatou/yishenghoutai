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
	MYYUNBOOK_INFO_SUCCESS,
	MYYUNBOOK_LIST_SUCCESS,
	SET_YUNBOOK_LIST_OFFSET,
	SET_MYYUNBOOK_LIST_OFFSET
} from 'constants/ActionTypes'
import { 
	YUNBOOK_GET_API,
	YUNBOOK_ADD_API,
	YUNBOOK_EDIT_API,
	YUNBOOK_LIST_API,
	YUNBOOK_INFO_API,
	OK
} from 'constants/api'
import fetch from 'isomorphic-fetch'
import { object2string } from 'utils/convert'
import { toastr } from 'react-redux-toastr'

const editYunbookSuccess = yunbook => ({
	type:YUNBOOK_EDIT_SUCCESS,
	yunbook
})
export const editYunbook = yunbook => {
	return (dispatch,getState) =>{
		const user = getState().auth.user
		return fetch(YUNBOOK_EDIT_API,{
			headers:{
				'Content-Type':'application/x-www-form-urlencoded'
			},
			method:'PUT',
			body:`key=${user.id}&token=${user.token}&${object2string(yunbook)}`
		}).then( response=>{
			if( response.ok ){
				return response.json()
			}else{
				throw new Error( response.statusText )
			}
		}).then( data=>{
			if( data.code === OK ){
				dispatch( editYunbookSuccess(yunbook) )
				return {
					ok:true
				}
			}else{
				throw new Error( data.msg )
			}
		}).catch( error => {
			return {
				msg:error.message
			}
		})
	}
}

export const getYunbookSuccess = (yunbook) => ({
	type:YUNBOOK_GET_SUCCESS,
	yunbook
})

export const getYunbook = bid => {
	return (dispatch,getState) => {
		const state = getState().yunbook
		if( state.detail && bid === state.detail.bid ){
			return
		}
		const yunbook = state.list.find( item => item.bid === bid )
		if( yunbook ){
			return dispatch(getYunbookSuccess( yunbook ))
		}
		return fetch(`${YUNBOOK_GET_API}?bid=${bid}`).then( response=>{
			if( response.ok ){
				return response.json()
			}else{
				throw new Error( response.statusText )
			}
		}).then( data => {
			if( data.code === OK ){
				if( data.get.bid > 0 ){
					dispatch( getYunbookSuccess( data.get ) )
				}else{
					toastr.error( '找不到该云板书' )
				}
			}else{
				throw new Error( data.msg )
			}
		}).catch( error => {
			toastr.error( error.message )
		})
	}
}

const addYunbookRequest = () => {
	return {
		type:YUNBOOK_ADD_REQUEST
	}
}

const addYunbookSuccess = () => {
	return {
		type : YUNBOOK_ADD_SUCCESS
	}
}

const addYunbookFailure = (errorMessage) => {
	return {
		type :YUNBOOK_ADD_FAILURE,
		errorMessage
	}
}

export const addYunbook = yunbook => {
	return (dispatch,getState) => {
		dispatch(addYunbookRequest())
		const user = getState().auth.user
		return fetch(YUNBOOK_ADD_API,{
			method: 'POST',
			headers:{
				'Content-Type':'application/x-www-form-urlencoded'
			},
			body : `key=${user.id}&token=${user.token}&${object2string(yunbook)}`
		}).then( response => {
			if( response.ok ){
				return response.json()
			}else {
				throw new Error(response.statusText)
			}
		}).then( data => {
			if( data.code === OK ){
				dispatch(addYunbookSuccess())
				toastr.success('新建云板书成功!')
				return data.identity
			}else {
				throw new Error(data.msg)
			}
		}).catch( error => {
			dispatch(addYunbookFailure(error.message))
			toastr.error(error.message)
		})
	}
}

const getYunbookListRequest = () => {
	return {
		type : YUNBOOK_LIST_REQUEST
	}
}

const getYunbookListSuccess = list => {
	return {
		type : YUNBOOK_LIST_SUCCESS,
		list
	}
}

const getMyYunbookListSuccess = list => {
	return {
		type : MYYUNBOOK_LIST_SUCCESS,
		list
	}
}

const getYunbookListFailure = errorMessage => {
	return {
		type : YUNBOOK_LIST_FAILURE,
		errorMessage
	}
}

export const getYunbookListIfNeeded = args => {
	return (dispatch,getState) => {
		dispatch( getYunbookListRequest() )
		const yunbookState = getState().yunbook		
		if( !args.limit ){
			args.limit = yunbookState.limit
		}
		if( !args.offset ){
			args.offset = yunbookState.offset
		}
		//uid = 0 all uid = undefined my
		if ( args.uid === undefined ){
			args.uid = getState().auth.user.id
			dispatch( setMyOffset(args.offset) )
		}else if ( args.uid === 0){
			dispatch( setOffset(args.offset) )
		}
		
		if (args.limit*args.offset <= yunbookState.list.length){
			return 
		} else {
			return fetch(`${YUNBOOK_LIST_API}?${object2string(args)}`)
			.then( response => {
				if( response.ok ){
					return response.json()
				}else {
					throw new Error(response.statusText)
				}
			}).then ( data => {
				if( data.code === OK ){
					dispatch( 
					args.uid === 0 ? getYunbookListSuccess( data.list )
					:getMyYunbookListSuccess( data.list ) 
					)
				}else{
					throw new Error(data.msg)
				}
			}).catch( error => {
				dispatch( getYunbookListFailure(error.message) )
				toastr.error( error.message )
			})
		}
	}
}

const getYunbookInfoRequest = () => {
	return {
		type : YUNBOOK_INFO_REQUEST
	}
}

const getYunbookInfoSuccess = (total) => {
	return {
		type : YUNBOOK_INFO_SUCCESS,
		total
	}
}

const getMyYunbookInfoSuccess = (total) => {
	return {
		type : MYYUNBOOK_INFO_SUCCESS,
		total
	}
}

const getYunbookInfoFailure = errorMessage => {
	return {
		type : YUNBOOK_INFO_FAILURE,
		errorMessage
	}
}

export const getYunbookInfo = (args) => {
	return (dispatch,getState) => {
		dispatch( getYunbookInfoRequest() )
		if( args.uid === undefined ){
			args.uid = getState().auth.user.id
		}
		return fetch(`${YUNBOOK_INFO_API}?${object2string(args)}`)
		.then( response => {
			if( response.ok ){
				return response.json()
			}else{
				throw new Error(response.statusText)
			}
		}).then( data=> {
			if( data.code === OK ){
				dispatch( 
					args.uid === 0?getYunbookInfoSuccess(data.count)
					:getMyYunbookInfoSuccess( data.count ) 
				)
			}else{
				throw new Error(data.msg)
			}
		}).catch( error => {
			dispatch( getYunbookInfoFailure(error.message) )
		})
	}
}

const setOffset = offset => ({
	type:SET_YUNBOOK_LIST_OFFSET,
	offset
})

const setMyOffset = offset => ({
	type:SET_MYYUNBOOK_LIST_OFFSET,
	offset
})