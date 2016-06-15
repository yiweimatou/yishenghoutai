import fetch from 'isomorphic-fetch'
import { GET_USER_SUCCESS } from 'constants/ActionTypes'
import {
    USER_GET_API,USER_INFO_API,OK
} from 'constants/api'
import {
    object2string
} from '../utils/convert'
import { toastr } from 'react-redux-toastr'

const getUserSuccess = user => ({
    type:GET_USER_SUCCESS,
    user
})

export const getUser = mobile => {
    return (dispatch,getState) => {
   const detail =  getState().user.detail
   if( detail && detail.mobile == mobile){
       return
   }
    return fetch(`${USER_GET_API}?mobile=${mobile}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => {
            if( data.code === OK){
                if( data.get.uid ){
                    dispatch( getUserSuccess(data.get) )
                }
            }else{
                throw new Error( data.msg )
            }
        }).catch(error => {
           toastr.error( error.message )
        })
    }
}

export const info = (args) => {
    return fetch(`${USER_INFO_API}?${object2string(args)}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => data).catch(error => {
            return {
                msg: error.message
            }
        })
}