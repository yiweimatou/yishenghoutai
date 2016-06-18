import {
	UPLOAD_COVER_REQUEST,
	UPLOAD_COVER_SUCCESS,
	UPLOAD_COVER_FAILURE,
    UPLOAD_YUNBOOK_REQUEST,
    UPLOAD_YUNBOOK_SUCCESS,
    UPLOAD_YUNBOOK_FAILURE
} from 'constants/ActionTypes'
import { UPLOAD_COVER_API,UPLOAD_YUNBOOK_API,OK,UPLOAD_PPT_API } from 'constants/api'
import fetch from 'isomorphic-fetch'
import { toastr } from 'react-redux-toastr'

const uploadCoverRequest = () => {
	return {
		type : UPLOAD_COVER_REQUEST
	}
}
const uploadCoverSuccess = () => {
	return {
		type : UPLOAD_COVER_SUCCESS
	}
}
const uploadCoverFailure = (errorMessage) => {
	return {
		type : UPLOAD_COVER_FAILURE,
		errorMessage
	}
}
export const uploadCover = (file) => {
    return dispatch => {
        dispatch(uploadCoverRequest())
        let formData =  new FormData()
        formData.append('upload_file',file)
        
        return fetch(UPLOAD_COVER_API, {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => {
            if (data.code === OK) {
                dispatch(uploadCoverSuccess())
                return data.cover
            } else {
                throw new Error(data.msg)
            }
        }).catch(error => {
            dispatch(uploadCoverFailure(error.message))
            toastr.error(error.message)
        })
    }
}

const uploadYunbookRequest = () => {
    return {
        type : UPLOAD_YUNBOOK_REQUEST
    }
}

const uploadYunbookSuccess = () => {
    return {
        type : UPLOAD_YUNBOOK_SUCCESS
    }
}

const uploadYunbookFailure = errorMessage => {
    return {
        type : UPLOAD_YUNBOOK_FAILURE,
        errorMessage
    }
}

export const uploadYunbook = (pptOrImage, file) => {
    if ( !file ) {
        return
    }
    let api = ''
    if( pptOrImage === 1){
        api = UPLOAD_PPT_API
    }else if( pptOrImage === 2){
        api = UPLOAD_YUNBOOK_API
    }
    return dispatch => {
        dispatch(uploadYunbookRequest())
        let formData =  new FormData()
        formData.append('upload_file',file)
        return fetch(api, {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => {
            if (data.code === OK) {
                dispatch(uploadYunbookSuccess())
                return data
            } else {
                throw new Error(data.msg)
            }
        }).catch(error => {
            dispatch(uploadYunbookFailure(error.message))
            toastr.error(error.message)
        })
    }
}