import {
    SECTION_ADD_API,
    OK
} from 'constants/api'
import {
    SECTION_ADD_REQUEST,
    SECTION_ADD_SUCCESS,
    SECTION_ADD_FAILURE
} from 'constants/ActionTypes'
import fetch from 'isomorphic-fetch'
import { object2string } from 'utils/convert'
import { toastr } from 'react-redux-toastr'

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