import fetch from 'isomorphic-fetch'
import {
    USER_GET_API,USER_INFO_API
} from 'constants/api'
import {
    object2string
} from '../utils/convert'

export const get = (args) => {
    return fetch(`${USER_GET_API}?${object2string(args)}`)
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