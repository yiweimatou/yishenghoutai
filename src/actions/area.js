import {
	AREA_LIST_REQUEST,
	AREA_LIST_SUCCESS,
	AREA_LIST_FAILURE,
	SET_SELECTED_AREA_SUCCESS
} from 'constants/ActionTypes'
import { AREA_LIST_API,OK,AREA_GET_API } from 'constants/api' 
import fetch from 'isomorphic-fetch'
import { object2string } from 'utils/convert'
import { toastr } from 'react-redux-toastr'

export const setSelectedAreaSuccess = (aid,zoom) => ({
	type: SET_SELECTED_AREA_SUCCESS,
	aid,zoom
})

export const getArea = args => {
	return (dispatch,getState)=> {
		const user = getState().auth.user
		return fetch(`${AREA_GET_API}?key=${user.id}&token=${user.token}&${object2string(args)}`).then( response=>{
			if( response.ok ){
				return response.json()
			}else {
				throw new Error( response.statusText )
			}
		}).then( data=>{
			if( data.code === OK ){
				return data.get
			}else{
				throw new Error( data.msg )
			}
		}).catch( error => {
			console.log( error.message )
		})
	}
}

const listAreaRequest = () => {
	return {
		type:AREA_LIST_REQUEST
	}
}

const listAreaSuccess = ( list,zoom ) => {
	return {
		type :AREA_LIST_SUCCESS,
		list,
		pid : list.length>0?list[0].pid:null,
		zoom :zoom
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
		const user =  getState().auth.user
		const list = getState().area.list?getState().area.list[args.pid]:null
		if(list){
			return dispatch(listAreaSuccess(list,args.zoom))
		}else{
			dispatch(listAreaRequest())
			return fetch(`${AREA_LIST_API}?key=${user.id}&token=${user.token}&limit=50&${object2string(args)}`)
				.then(response => {
					if( response.ok ){
						return response.json()
					}else{
						throw new Error(response.statusText)
					}
				}).then( data => {
					if( data.code === OK){
						dispatch(listAreaSuccess(data.list,args.zoom))
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