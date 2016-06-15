import { 
    ORGANIZELESSON_LIST_REQUEST,
    ORGANIZELESSON_LIST_SUCCESS,
    ORGANIZELESSON_LIST_FAILURE,
    ORGANIZELESSON_ADD_REQUEST,
    ORGANIZELESSON_ADD_SUCCESS,
    ORGANIZELESSON_ADD_FAILURE
} from '../constants/ActionTypes'
import {
    OK,
    ORGANIZELESSON_LIST_API,
    ORGANIZELESSON_ADD_API
} from 'constants/api'
import fetch from 'isomorphic-fetch'
import { object2string } from 'utils/convert'
import { toastr } from 'react-redux-toastr'

const getOrganizeLessonListRequest = () => ({
    type:ORGANIZELESSON_LIST_REQUEST
})

const getOrganizeLessonListSuccess = () => ({
    type:ORGANIZELESSON_LIST_SUCCESS
})

const getOrganizeLessonListFailure = errorMessage => ({
    type:ORGANIZELESSON_LIST_FAILURE,
    errorMessage
})

export const getOrganizeLessonListIfNeeded = args => {
    return (dispatch,getState) => {
        dispatch( getOrganizeLessonListRequest() )
        return fetch(`${ORGANIZELESSON_LIST_API}`)
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