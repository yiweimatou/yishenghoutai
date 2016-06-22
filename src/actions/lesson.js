import { 
	OK,
	LESSON_ADD_API,
	LESSON_GET_API,
	// LESSON_INFO_API,
	LESSON_LIST_API,
	LESSON_EDIT_API
} from 'constants/api'
import {
	LESSON_ADD_REQUEST,
	LESSON_ADD_SUCCESS,
	LESSON_ADD_FAILURE,
	LESSON_EDIT_REQUEST,
	LESSON_EDIT_SUCCESS,
	LESSON_EDIT_FAILURE,
	// LESSON_INFO_REQUEST,
	// LESSON_INFO_SUCCESS,
	// LESSON_INFO_FAILURE,
	LESSON_LIST_REQUEST,
	LESSON_LIST_SUCCESS,
	LESSON_LIST_FAILURE,
	LESSON_GET_REQUEST,
	LESSON_GET_SUCCESS,
	LESSON_GET_FAILURE,
	LIST_TEAM_LESSON_SUCCESS
} from 'constants/ActionTypes'
import fetch  from 'isomorphic-fetch'
import { object2string } from 'utils/convert'
import { toastr } from 'react-redux-toastr'

const addLessonRequest = () => {
	return {
		type : LESSON_ADD_REQUEST
	}
}
const addLessonSuccess = () => {
	return {
		type :LESSON_ADD_SUCCESS
	}
}
const addLessonFailure = ( errorMessage ) => {
	return {
		type : LESSON_ADD_FAILURE,
		errorMessage
	}
}
export const addLesson = ( lesson ) => {
	return ( dispatch,getState ) => {
		dispatch( addLessonRequest() )
		const user = getState().auth.user
		return fetch(LESSON_ADD_API,{
			method : 'POST',
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body : `key=${user.id}&token=${user.token}&${object2string(lesson)}`
		}).then( response => {
			if( response.ok ){
				return response.json()
			}else {
				throw new Error(response.statusText)
			}
		}).then( data => {
			if( data.code === OK ){
				dispatch(addLessonSuccess())
				toastr.success('新建成功!')
				return data.identity
			}else {
				throw new Error(data.msg)
			}
		}).catch( error => {
			dispatch(addLessonFailure(error.message))
			toastr.error(error.message || '新建失败')
		})
	}
}

const editLessonRequest = () => {
	return {
		type: LESSON_EDIT_REQUEST
	}
}

const editLessonSuccess = (args) => {
	return {
		type : LESSON_EDIT_SUCCESS,
		args
	}
}

const editLessonFailure = ( errorMessage ) => {
	return {
		type : LESSON_EDIT_FAILURE,
		errorMessage 
	}
}

export const editLesson = ( args ) => {
	return ( dispatch,getState ) => {
		dispatch( editLessonRequest() )
		const user =  getState().auth.user
		return fetch(LESSON_EDIT_API,{
			method : 'PUT',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
			body : `key=${user.id}&token=${user.token}&${object2string(args)}`
		}).then( response => {
			if( response.ok ){
				return response.json()
			}else {
				throw new Error(response.statusText)
			}
		}).then( data => {
			if( data.code === OK ){
				dispatch(editLessonSuccess(args))
				toastr.success('编辑成功!')
				return true
			}else {
				throw new Error(data.msg)
			}
		}).catch( error => {
			dispatch(editLessonFailure(error.message))
			toastr.error(error.message || '编辑失败')
		})
	}
}

const getLessonRequest = () => {
	return {
		type : LESSON_GET_REQUEST
	}
}

const getLessonSuccess = ( lesson ) => {
	return {
		type : LESSON_GET_SUCCESS,
		lesson
	}
}

const getLessonFailure = ( errorMessage ) => {
	return {
		type : LESSON_GET_FAILURE,
		errorMessage
	}
}

export const getLessonIfNeeded = ( args ) => {
	return (dispatch,getState) => {
		const lesson = getState().lesson
		if(lesson.detail && lesson.detail.lid === args.lid){
			return lesson.detail
		}
		const detail = lesson.list.find(item => {
			return item.lid === args.lid
		})
		if(detail){
			dispatch(getLessonSuccess(detail))
			return detail
		}
		dispatch(getLessonRequest())
		return fetch(`${LESSON_GET_API}?${object2string(args)}`)
		.then( response => {
			if( response.ok ){
				return response.json()
			}else {
				throw new Error(response.statusText)
			}
		}).then( data => {
			if( data.code === OK ){
				dispatch(getLessonSuccess(data.get))
				return data.get
			}else {
				throw new Error(data.msg)
			}
		}).catch( error => {
			dispatch(getLessonFailure(error.message))
		})
	} 
}

const listLessonRequest = () => {
	return {
		type : LESSON_LIST_REQUEST
	}
}

const listLessonSuccess = lessons => {
	return {
		type : LESSON_LIST_SUCCESS,
		lessons
	}
}

const listLessonFailure = errorMessage => {
	return {
		type : LESSON_LIST_FAILURE,
		errorMessage
	}
}

export const listLesson = ( args ) => {
	return dispatch => {
		dispatch(listLessonRequest())
		return fetch(`${LESSON_LIST_API}?${object2string(args)}`)
		.then( response => {
			if( response.ok ){
				return response.json()
			}else {
				throw new Error(response.statusText)
			}
		}).then( data => {
			if( data.code === OK ){
				dispatch(listLessonSuccess(data.list))
			}else {
				throw new Error(data.msg)
			}
		}).catch( error => {
			dispatch(listLessonFailure(error.message))
		})
	}
}

const listTeamLessonSuccess = list => ({
	type:LIST_TEAM_LESSON_SUCCESS,
	list
})

export const listTeamLesson = args =>{
	return dispatch => {
		return fetch(`${LESSON_LIST_API}?${object2string(args)}`)
		.then( response => {
			if( response.ok ){
				return response.json()
			}else {
				throw new Error(response.statusText)
			}
		}).then( data => {
			if( data.code === OK ){
				dispatch(listTeamLessonSuccess(data.list))
			}else {
				throw new Error(data.msg)
			}
		})
	}
}