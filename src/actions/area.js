import {
	AREA_LIST_REQUEST,
	AREA_LIST_SUCCESS,
	AREA_LIST_FAILURE
} from 'constants/ActionTypes'
import { AREA_LIST_API,OK } from 'constants/api' 
import fetch from 'isomorphic-fetch'
import { object2string } from 'utils/convert'
import { toastr } from 'react-redux-toastr'

const listAreaRequest = () => {
	return {
		type:AREA_LIST_REQUEST
	}
}

const listAreaSuccess = ( list ) => {
	return {
		type :AREA_LIST_SUCCESS,
		list,
		pid : list[0].pid,
		zoom : list[0].zoom
	}
}

const listAreaFailure = errorMessage => {
	return {
		type : AREA_LIST_FAILURE,
		errorMessage
	}
}

export const listAreaIfNeeded = args => {
	return (dispatch,getState) => {
		const list = getState().area.list?getState().area.list[args.pid]:null
		if(list){
			return dispatch(listAreaSuccess(list))
		}else{
			dispatch(listAreaRequest())
			return fetch(`${AREA_LIST_API}?limit=50&${object2string(args)}`)
				.then(response => {
					if( response.ok ){
						return response.json()
					}else{
						throw new Error(response.statusText)
					}
				}).then( data => {
					if( data.code === OK){
						if( data.list.length > 0 ){
							dispatch(listAreaSuccess(data.list))
						}else {
							dispatch(listAreaFailure(''))
						}
					}else{
						throw new Error(data.msg)
					}
				}).catch( error => {
					dispatch(listAreaFailure(error.message))
					toastr.error(error.message || '获取区域列表出错')
				})
		}
	}
}