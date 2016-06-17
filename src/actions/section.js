import {
    SECTION_ADD_API,
    SECTION_LIST_API,
    SECTION_INFO_API,
    OK
} from 'constants/api'
import {
    SECTION_ADD_REQUEST,
    SECTION_ADD_SUCCESS,
    SECTION_ADD_FAILURE,
    GET_SECTION_LIST_SUCCESS,
    SET_OFFSET_SUCCESS,
    SET_TOTAL_SUCCESS
} from 'constants/ActionTypes'
import fetch from 'isomorphic-fetch'
import { object2string } from 'utils/convert'
import { toastr } from 'react-redux-toastr'

const setTotalSuccess = total => ({
    type:SET_TOTAL_SUCCESS,
    total
})

export const setTotal = args => {
    return dispatch => {
        return fetch(`${SECTION_INFO_API}?${object2string(args)}`).then( response=>{
            if( response.ok ){
                return response.json()
            }else{
                throw new Error( response.statusText )
            }
        }).then( data=>{
            if( data.code === OK ){
                dispatch( setTotalSuccess( data.count ) )
            }else{
                throw new Error( data.msg )
            }
        }).catch( error=>{
            toastr.error( error.message )
        })
    }
} 

const getSectionListSuccess = (list) =>({
    type:GET_SECTION_LIST_SUCCESS,
    list
})

const setOffsetSuccess = offset => ({
    type:SET_OFFSET_SUCCESS,
    offset
})

export const getSectionList = args => {
    return dispatch => {
        return fetch(`${SECTION_LIST_API}?${object2string(args)}`).then( response=>{
            if( response.ok ){
                return response.json()
            }else{
                throw new Error( response.statusText )
            }
        }).then( data=>{
            if( data.code === OK ){
                if( data.list.length >0 ){
                    dispatch( getSectionListSuccess(data.list) )
                    if( args.offset > 1 ){
                        setOffsetSuccess(args.offset)
                    }
                }
            }else{
                throw new Error( data.msg )
            }
        }).catch( error => {
            toastr.error( error.message )
        })
    }
}

const addSectionRequest = () => ({
    type: SECTION_ADD_REQUEST
})

const addSectionSuccess = () => ({
    type : SECTION_ADD_SUCCESS
})

const addSectionFailure = errorMessage => ({
    type :SECTION_ADD_FAILURE,
    errorMessage
})

export const addSection = section => {
    return ( dispatch,getState ) => {
        dispatch( addSectionRequest() )
        const user = getState().auth.user
        return fetch( SECTION_ADD_API,{
            method : 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:`key=${user.id}&token=${user.token}&${object2string(section)}`
        }).then( response => {
            if( response.ok ){
                return response.json()
            }else {
                throw new Error( response.statusText )
            }
        }).then( data => {
            if ( data.code === OK ){
                dispatch( addSectionSuccess() )
                toastr.success('文章新建成功')
            }else{
                throw new Error(data.msg)
            }
        }).catch( error =>{
            dispatch( addSectionFailure( error.message) )
            toastr.error( error.message )
        })
    }
}