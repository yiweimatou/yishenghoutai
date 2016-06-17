import { 
    ORGANIZELESSON_LIST_REQUEST,
    ORGANIZELESSON_LIST_SUCCESS,
    ORGANIZELESSON_LIST_FAILURE,
    ORGANIZELESSON_EDIT_REQUEST,
    ORGANIZELESSON_EDIT_SUCCESS,
    ORGANIZELESSON_EDIT_FAILURE,
    ORGANIZELESSON_SLIST_SUCCESS,
    GET_PASS_ORGANIZELIST_SUCCESS
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

export const getOrganizeLessonListRequest = () => ({
    type:ORGANIZELESSON_LIST_REQUEST
})

const getOrganizeLessonListSuccess = (list) => ({
    type:ORGANIZELESSON_LIST_SUCCESS,
    list
})

const getOrganizeLessonSListSuccess = list => ({
    type:ORGANIZELESSON_SLIST_SUCCESS,
    list
})

export const getOrganizeLessonListFailure = () => ({
    type:ORGANIZELESSON_LIST_FAILURE
})

export const getOrganizeLessonListIfNeeded = args => {
    return (dispatch) => {
        return fetch(`${ORGANIZELESSON_LIST_API}?${object2string(args)}`).then( response=> {
            if( response.ok){
                return response.json()
            }else{
                throw new Error( response.statusText )
            }
        }).then( data => {
            if( data.code === OK ){
                if( args.lid ){
                    dispatch( getPassOrganizeListSuccess(data.list) )
                }else{
                    if(args.cet ===1){ 
                        dispatch( getOrganizeLessonListSuccess(data.list) )
                    }else if( args.cet === 4){
                        dispatch( getOrganizeLessonSListSuccess(data.list) )
                    }
                }
                
            }else{
                throw new Error( data.msg )
            }
        }).catch( error => {
            toastr.error(error.message)
        })
    }
}

export const getPassOrganizeListSuccess = list => ({
    type:GET_PASS_ORGANIZELIST_SUCCESS,
    list
})

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