import {
    initialize
} from 'redux-form'
import { injectReducer } from '../../store/reducers'
import { getYunbookListIfNeeded,getYunbookInfo } from 'actions/yunbook'

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