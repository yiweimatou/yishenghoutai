import fetch from 'isomorphic-fetch'
import {
    ORGANIZE_GET_API,
    ORGANIZE_EDIT_API,
    ORGANIZE_LIST_API,
    OK
} from 'constants/api'
import { object2string } from '../utils/convert'
import { 
    ORGANIZE_LIST_SUCCESS,
    ORGANIZE_LIST_FAILURE,
    ORGANIZE_LIST_REQUEST,
    ORGANIZE_EDIT_SUCCESS,
    ORGANIZE_EDIT_FAILURE,
    ORGANIZE_EDIT_REQUEST,
    ORGANIZE_GET_SUCCESS,
    ORGANIZE_GET_FAILURE,
    ORGANIZE_GET_REQUEST 
} from 'constants/ActionTypes'
import { toastr } from 'react-redux-toastr'

export const getOrganizeSuccess = organize => ({
    type:ORGANIZE_GET_SUCCESS,
    organize
})

export const getOrganize = (key,token,args) => {
    return fetch(`${ORGANIZE_GET_API}?key=${key}&token=${token}&${object2string(args)}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => data)
        .catch(error => {
            return {
                msg: error.message
            }
        })
}

export const getOrganizeIfNeeded = (args) => {
    return (dispatch,getState) => {
        const organize = getState().organize
        if(organize.detail && organize.detail.oid === args.oid){
            return
        }
        const detail = organize.list.find(item => {
            return item.oid === args.oid
        })
        if (detail) {
            return dispatch(getOrganizeSuccess(detail))
        }
        const user = getState().auth.user
        return getOrganize(user.id, user.token, args).then(data => {
            if (data.code === OK && data.get.oid > 0) {
                return dispatch(getOrganizeSuccess(data.get))
            } else {
                throw new Error(data.msg || '找不到该机构')
            }
        }).catch(error => {
            toastr.error(error.message)
        }) 
    }
}

export const editOrganizeRequest = () => {
    return {
        type : ORGANIZE_EDIT_REQUEST
    }
}

export const editOrganizeSuccess = (args) => {
    return {
        type : ORGANIZE_EDIT_SUCCESS,
        organize : args
    }
}

export const editOrganizeFailure = message => {
    return {
        type : ORGANIZE_EDIT_FAILURE,
        message
    }
}

export const editOrganize = args => {
    return ( dispatch, getState ) => {
        const user =  getState().auth.user
        return fetch(ORGANIZE_EDIT_API,{
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method : 'PUT',
            body : `key=${user.id}&token=${user.token}&${object2string(args)}`
        }).then(response => {
            if( response.ok ){
                return response.json()
            }else {
                throw new Error(response.statusText)
            }
        }).then( data => {
            if( data.code === OK ){
                dispatch( editOrganizeSuccess(args) )
                toastr.success('编辑成功！')
            }else {
                throw new Error(data.msg || '编辑失败')
            }
        }).catch( error => {
            toastr.error(error.message)
        })
    }
}

export const fetchListRequest = () => {
    return {
        type:ORGANIZE_LIST_REQUEST
    }
}
export const fetchListSuccess = list => {
    return {
        type:ORGANIZE_LIST_SUCCESS,
        list
    }
}

export const fetchListFailure = message => {
    return {
        type:ORGANIZE_LIST_FAILURE,
        message
    }
}

export const fetchList = args => {
    return (dispatch,getState) => {
        dispatch( fetchListRequest() )
        const user =  getState().auth.user 
        return fetch(`${ORGANIZE_LIST_API}?key=${user.id}&token=${user.token}&uid=${user.id}${object2string(args)}`)
        .then(response => {
            if(response.ok) {
                return response.json()
            }else {
                throw new Error(response.statusText)
            }
        }).then( data => {
            if( data.code  === OK ){
                dispatch( fetchListSuccess( data.list ) )
            }else {
                throw new Error( data.msg || '获取列表失败' )
            }
        } )
        .catch( error => {
            dispatch( fetchListFailure( error.message ) )
        })
    }
}

// export const add = organize => {
//     return (dispatch, getState) => {
//         const user = getState().auth.user
//         return fetch(ORGANIZE_ADD_API, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: `${object2string(organize)}&&key=${user.id}&&token=${user.token}`
//         }).then(response => {
//             if (response.ok) {
//                 return response.json()
//             } else {
//                 throw new Error(response.statusText)
//             }
//         }).then(data => data).catch(error => {
//             return {
//                 msg: error.message
//             }
//         })
//     }
// }