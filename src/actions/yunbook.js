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
	YUNBOOK_EDIT_FAILURE,
	YUNBOOK_INFO_REQUEST,
	YUNBOOK_INFO_SUCCESS,
	YUNBOOK_INFO_FAILURE
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
		if ( args.uid === undefined ){
			args.uid = getState().auth.user.id
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
					dispatch( getYunbookListSuccess(data.list) )
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
				dispatch( getYunbookInfoSuccess(data.count) )
			}else{
				throw new Error(data.msg)
			}
		}).catch( error => {
			dispatch( getYunbookInfoFailure(error.message) )
		})
	}
}