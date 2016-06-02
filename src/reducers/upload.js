import {
    UPLOAD_COVER
} from '../constants/actiontypes/upload.js'

const initialState = {
    isUploading:false
}
export default function upload(state=initialState,action){
    switch(action.type){
        case UPLOAD_COVER:
            return state
        default:
            return state  
    }
}