import fetch from 'isomorphic-fetch'
import { 
    TEAM_ADD_API,
    TEAM_LIST_API,
    TEAM_REMOVE_API,
    OK
 } from '../constants/api'
 import {
     GET_LESSONTEAM_LIST_REQUEST,
     GET_LESSONTEAM_LIST_SUCCESS,
     GET_LESSONTEAM_LIST_FAILURE,
     GET_TEAMINVITED_LIST_REQUEST,
     GET_TEAMINVITED_LIST_SUCCESS,
     GET_TEAMINVITED_LIST_FAILURE,
     REMOVE_LESSONTEAM_SUCCESS
 } from '../constants/ActionTypes'
import {
    toastr
} from 'react-redux-toastr'

const removeLessonTeamSuccess = id => ({
    type:REMOVE_LESSONTEAM_SUCCESS,
    id
})

export const removeLessonTeam = id => {
    return ( dispatch,getState ) =>{
        const user = getState().auth.user
        return fetch( TEAM_REMOVE_API,{
            method:'DELETE',
            body:`key=${user.id}&token=${user.token}&id=${id}`
        }).then( response => {
            if( response.ok ){
                return response.json()
            }else{
                throw new Error( response.statusText )
            }
        }).then( data=>{
            if( data.code === OK ){
                dispatch( removeLessonTeamSuccess(id) )
                toastr.success( '移除成功!' )
            }else{
                throw new Error(data.msg)
            }
        } ).catch( error => {
            toastr.error( error.message )
        })
    }
}
const getLessonTeamListRequest = () => ({
    type:GET_LESSONTEAM_LIST_REQUEST
})

const getLessonTeamListSuccess = list => ({
    type:GET_LESSONTEAM_LIST_SUCCESS,
    list
})

const getLessonTeamListFailure = () => ({
    type:GET_LESSONTEAM_LIST_FAILURE
})

export const getLessonTeamList = (lid) => {
    return dispatch => {
        dispatch( getLessonTeamListRequest() )
        return fetch(`${TEAM_LIST_API}?lid=${lid}&cet=4`).then( response => {
            if( response.ok ){
                return response.json()
            }else{
                throw new Error( response.statusText )
            }
        }).then( data => {
            if( data.code === OK ){
                dispatch( getLessonTeamListSuccess(data.list) )
            }else{
                throw new Error( data.msg )
            }
        }).then( () => {
            dispatch( getLessonTeamListFailure() )
        })
    }
}

export const addLessonTeam = (lid, mobile) => {
    return (dispatch, getState) => {
        const user = getState().auth.user
        return fetch(TEAM_ADD_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `key=${user.id}&token=${user.token}&mobile=${mobile}&lid=${lid}`
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => {
            if (data.code === OK) {
                toastr.success('邀请成功!')
                return true
            } else {
                throw new Error(data.msg)
            }
        }).catch(error => {
            toastr.error(error.message)
        })
    }
}