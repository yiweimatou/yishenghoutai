import {
    FETCH_YUNBOOK_BY_ID_SUCCESS,
    FETCH_AREA_BY_ZOOM_AND_PID_SUCCESS,
    SET_SELECTED_AREA,
    EDIT_SUBMIT_SUCCESS
} from 'constants/ActionTypes'

const initialState = {
    detail:null,
    select:{
        [0]:null,
        [1]:null,
        [2]:null,
        [3]:null
    },
    areas:{
        [0]:[],
        [1]:[],
        [2]:[],
        [3]:[]
    }
}
const  ACTION_HANDLER = {
    [EDIT_SUBMIT_SUCCESS]:(state,action)=>({
        ...state,
        detail:Object.assign({},state.detail,action.yunbook)
    }),
    [SET_SELECTED_AREA]:(state,action)=>({
        ...state,
        select:{
            ...state.select,
            [action.zoom-4]:action.aid
        },
        areas:{
            ...state.areas,
            [action.zoom-4]:action.areas
        }
    }),
    [FETCH_YUNBOOK_BY_ID_SUCCESS]:(state,action)=>({
        ...state,
        detail:action.yunbook
    }),
    [FETCH_AREA_BY_ZOOM_AND_PID_SUCCESS]:(state,action)=>{
        if( action.zoom == 5 ){
            return {
                ...state,
                areas:{
                    ...state.areas,
                    [1]:action.areas,
                    [2]:null,
                    [3]:null
                }
            }
        }else if(action.zoom==6){
            return{
                ...state,
                areas:{
                    ...state.areas,
                    [2]:action.areas,
                    [3]:null
                }
            }
        }else if(action.zoom==7){
            return{
                ...state,
                areas:{
                    ...state.areas,
                    [3]:action.areas
                }
            }
        }else{
            return{
                ...state
            }
        }   
    }
}

const editViewReducer = (state=initialState,action)=>{
    const handler = ACTION_HANDLER[action.type]
    return handler?handler(state,action):state
}

export default editViewReducer