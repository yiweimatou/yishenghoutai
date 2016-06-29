import fetch from 'isomorphic-fetch'
import { YUNBOOK_GET_API,OK } from 'constants/api'
import {
    FETCH_YUNBOOK_BY_ID_SUCCESS,
    FETCH_AREA_BY_ZOOM_AND_PID_SUCCESS,
    SET_SELECTED_AREA,
    EDIT_SUBMIT_SUCCESS
} from 'constants/ActionTypes'
import { toastr } from 'react-redux-toastr'
import { fetchAreas,getArea } from 'actions/area'
import { editYunbook } from 'actions/yunbook'

const onEditSubmitSuccess = yunbook => ({
    type:EDIT_SUBMIT_SUCCESS,
    yunbook
})
export const onEditSubmit = yunbook => {
    return dispatch=>{
        dispatch( editYunbook(yunbook) ).then( result=>{
            if( result.ok ){
                dispatch(onEditSubmitSuccess(yunbook))
                toastr.success(' 编辑成功！ ')
            }else{
                toastr.error('编辑失败:'+result.msg)
            }
        })
    }
}
const fetchSelectdAreaSuccess = (areas,zoom,aid) => ({
    type:SET_SELECTED_AREA,
    areas,
    zoom,
    aid
})

const getAreas = (zoom,pid) => {
    return ( dispatch,getState )=>{
        const areaState = getState().area
        if(areaState&&areaState.list[pid]){
            return dispatch( fetchAreaByZoomAndPidSuccess(areaState.list[pid]) ) 
        }
        const user = getState().auth.user
        return fetchAreas({
            key : user.id,
            token:user.token,
            zoom,
            pid
        }).then( areas => {
            if( areas.ok ){
                return areas.list
            }else{
                throw new Error( areas.msg )
            }
        }).catch( error=>{
            toastr.error( error.message )
        }) 
    }
}

export const fetchSelectedArea = (aid)=>{
    return (dispatch) => {
        dispatch( getArea({aid}) ).then(area=>{
            if(area){
                dispatch(getAreas(7,area.pid)).then(areas=>{
                    dispatch(fetchSelectdAreaSuccess(areas,7,area.aid))
                })
                return dispatch( getArea({aid:area.pid}) )
            }else{
                throw new Error(`get area failure aid:${aid}`)
            }
        }).then( area=>{
            if(area){
                dispatch(getAreas(6,area.pid)).then(areas=>{
                    dispatch(fetchSelectdAreaSuccess(areas,6,area.aid))
                })
                return dispatch( getArea({aid:area.pid}) )
            }else{
                throw new Error(`get area failure aid:${area.aid}`)
            }
        }).then( area=>{
            if(area){
                dispatch(getAreas(5,area.pid)).then(areas=>{
                    dispatch(fetchSelectdAreaSuccess(areas,5,area.aid))
                })
                return dispatch( getArea({aid:area.pid}) )
            }else{
                throw new Error(`get area failure aid:${area.aid}`)
            }
        }).then( area=>{
            if(area){
                dispatch(getAreas(4,area.pid)).then(areas=>{
                    dispatch(fetchSelectdAreaSuccess(areas,4,area.aid))
                })
            }else{
                throw new Error(`get area failure aid:${area.aid}`)
            }
        }).catch( error=>{
            toastr.error( error.message )
        })
        
    }
}

const fetchAreaByZoomAndPidSuccess = (areas,zoom) => ({
    type:FETCH_AREA_BY_ZOOM_AND_PID_SUCCESS,
    zoom,
    areas
})

export const fetchAreaByZoomAndPid = (zoom,pid) => {
    return ( dispatch,getState )=>{
        const areaState = getState().area
        if(areaState&&areaState.list[pid]){
            return dispatch( fetchAreaByZoomAndPidSuccess(areaState.list[pid],zoom) ) 
        }
        const user = getState().auth.user
        return fetchAreas({
            key : user.id,
            token:user.token,
            zoom,
            pid
        }).then( areas => {
            if( areas.ok ){
                return dispatch(fetchAreaByZoomAndPidSuccess( areas.list,zoom ))
            }else{
                throw new Error( areas.msg )
            }
        }).catch( error=>{
            toastr.error( error.message )
        }) 
    }
}

const fetchYunbookByIdSuccess = yunbook => ({
    type:FETCH_YUNBOOK_BY_ID_SUCCESS,
    yunbook
})

export const fetchYunbookById = bid => {
    return (dispatch,getState) => {
        const yunbookState = getState().yunbook
        if( yunbookState && yunbookState.list.length > 0 ){
            const _yunbook = yunbookState.list.find( item=>item.bid===bid )
            if( _yunbook ){
                return dispatch(fetchYunbookByIdSuccess(_yunbook))
            }
        }
        const detail = getState().yunbookEditView.detail 
        if( detail&&detail.bid === bid ){
            return dispatch(fetchYunbookByIdSuccess( detail ))
        }
        return fetch( `${YUNBOOK_GET_API}?bid=${bid}` ).then(response=>{
            if( response.ok ){
                return response.json()
            }else{
                throw new Error( response.statusText )
            }
        }).then( data => {
            if( data.code === OK ){
                return dispatch(fetchYunbookByIdSuccess( data.get ))
            }else{
                throw new Error( data.msg )
            }
        }).catch( error=>{
            toastr.error( error.message )
        })
    }
}