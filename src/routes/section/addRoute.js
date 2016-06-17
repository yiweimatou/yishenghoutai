import {
    initialize
} from 'redux-form'
import { injectReducer } from '../../store/reducers'
import { getYunbookListIfNeeded,getYunbookInfo } from 'actions/yunbook'
import {
    listAreaIfNeeded,setSelectedAreaSuccess,getArea
} from 'actions/area'
import { getLessonIfNeeded } from 'actions/lesson'

const addRoute = store => ({
    path:'add/:id',
    onEnter(nextState,replace){
        const lid = nextState.params.id
        if( !lid ){
            return replace({
                pathname:'/'
            })
        }
        store.dispatch(initialize('addSection',{
            lid:lid
        }))
        if( store.asyncReducers['lesson'] === undefined ) {
            const reducer = require('reducers/lesson').default
            injectReducer(store, {
                key: 'lesson',
                reducer
            })
        }
        store.dispatch(listAreaIfNeeded({
            pid: 1,
            zoom: 4
        }))
        Promise.resolve( store.dispatch( getLessonIfNeeded({
            lid
        }))).then( lesson=>{
            if( lesson && lesson.aid > 0 ){
                return getArea( {aid:lesson.aid} ) 
            }else{
                throw new Error( '获取课程失败' )
            }
        }).then( area => {
            store.dispatch( listAreaIfNeeded({
                pid:area.aid,
                zoom:7
            }))
            //set zoom 6 select
            store.dispatch( setSelectedAreaSuccess(area.aid,area.zoom) )
            return getArea({aid:area.pid})
        }).then( area => {
            store.dispatch( listAreaIfNeeded({
                pid:area.aid,
                zoom:6
            }))
            //set zoom 5 select
            store.dispatch( setSelectedAreaSuccess(area.aid,area.zoom))
            return getArea({aid:area.pid})
        }).then( area => {
            store.dispatch( listAreaIfNeeded({
                pid:area.aid,
                zoom:5
            }))
            //set zoom 4 select
            store.dispatch( setSelectedAreaSuccess(area.aid,area.zoom))
        })
        
        if (store.asyncReducers['yunbook'] === undefined) {
            const reducer = require('reducers/yunbook').default
            injectReducer(store, {
                key: 'yunbook',
                reducer
            })
        }
         const yunbookState = store.getState().yunbook
        if( yunbookState.list.length === 0 ){
            store.dispatch( getYunbookInfo( { } ) )
            store.dispatch( getYunbookListIfNeeded({
                offset:1,
                limit:4
            }) )
            store.dispatch( getYunbookInfo( { uid:0 } ) )
            store.dispatch( getYunbookListIfNeeded({
                offset:1,
                limit:4,
                uid:0
            }) )
        }
    },
    getComponent(nextState,cb){
        require.ensure([],require => {
            cb(null,require('containers/pages/section/addSectionContainer').default)
        })
    }
})

export default addRoute