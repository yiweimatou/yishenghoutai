import { 
    ORGANIZELESSON_LIST_REQUEST,
    ORGANIZELESSON_LIST_SUCCESS,
    ORGANIZELESSON_LIST_FAILURE,
    ORGANIZELESSON_EDIT_REQUEST,
    ORGANIZELESSON_EDIT_SUCCESS,
    ORGANIZELESSON_EDIT_FAILURE
} from '../constants/ActionTypes'
import {
    OK,
    ORGANIZELESSON_LIST_API,
    ORGANIZELESSON_ADD_API,
    ORGANIZELESSON_EDIT_API
} from 'constants/api'
import fetch from 'isomorphic-fetch'
import { object2string } from 'utils/convert'
import { toastr } from 'react-redux-toastr'

const editOrganizeLessonRequest = () => ({
    type:ORGANIZELESSON_EDIT_REQUEST
})

const editOrganizeLessonSuccess = id => ({
    type:ORGANIZELESSON_EDIT_SUCCESS,
    id
})

const editOrganizeLessonFailure = () => ({
    type:ORGANIZELESSON_EDIT_FAILURE
})

export const editOrganizeLesson = args => {
    return (dispatch,getState) => {
        dispatch( editOrganizeLessonRequest() )
        const user = getState().auth.user
        return fetch(ORGANIZELESSON_EDIT_API,{
            method:'PUT',
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body : `key=${user.id}&token=${user.token}&${object2string(args)}`
        }).then( response=>{
            if( response.ok ){
                return response.json()
            }else{
                throw new Error( response.statusText )
            }
        }).then(data=>{
            if( data.code === OK ){
                dispatch( editOrganizeLessonSuccess(args.id) )
                toastr.success('操作成功!')
            }else{
                throw new Error(data.msg)
            }
        }).catch( error=>{
             dispatch( editOrganizeLessonFailure() )
             toastr.error( error.message )
        })
    }
}

const getOrganizeLessonListRequest = () => ({
    type:ORGANIZELESSON_LIST_REQUEST
})

const getOrganizeLessonListSuccess = (list) => ({
    type:ORGANIZELESSON_LIST_SUCCESS,
    list
})

const getOrganizeLessonListFailure = () => ({
    type:ORGANIZELESSON_LIST_FAILURE
})

export const getOrganizeLessonListIfNeeded = args => {
    return (dispatch) => {
        dispatch( getOrganizeLessonListRequest() )
        return fetch(`${ORGANIZELESSON_LIST_API}?${object2string(args)}`).then( response=> {
            if( response.ok){
                return response.json()
            }else{
                throw new Error( response.statusText )
            }
        }).then( data => {
            if( data.code === OK ){
                dispatch( getOrganizeLessonListSuccess(data.list) )
            }else{
                throw new Error( data.msg )
            }
        }).catch( error => {
            toastr.error(error.message)
            dispatch( getOrganizeLessonListFailure() )
        })
    }
}

export const addOrganizeLesson = (oid,lid) => {
    return ( dispatch,getState ) => {
        const user = getState().auth.user
        return fetch( ORGANIZELESSON_ADD_API,{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body:`key=${user.id}&token=${user.token}&oid=${oid}&lid=${lid}`
        }).then( response =>{
            if (response.ok){
                return response.json()
            }else{
                throw new Error(response.statusText)
            }
        }).then( data => {
            if( data.code === OK ){
                toastr.success('申请成功!')
                return true
            }else{
                throw new Error( data.msg )
            }
        }).catch( error => {
            toastr.error(error.message)
        })
    }
}