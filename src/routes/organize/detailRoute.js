import { getOrganizeIfNeeded } from 'actions/organize'
import {
    injectReducer
} from '../../store/reducers.js'
import { getOrganizeLessonListIfNeeded } from 'actions/organizeLesson'

const detailRoute = store => ({
    path:'detail/:id',
    onEnter(nextState,replace){
        const oid = nextState.params.id
        if( !oid ){
            return replace({
                pathname:'/'
            })
        }
        store.dispatch( getOrganizeIfNeeded({
            oid
        }))
        if (store.asyncReducers['organizeLesson'] === undefined) {
            const reducer = require('reducers/organizeLesson').default
            injectReducer(store, {
                key: 'organizeLesson',
                reducer
            })
        }
        store.dispatch( getOrganizeLessonListIfNeeded({
            oid,limit:20,offset:1,cet:1
        }))
        store.dispatch( getOrganizeLessonListIfNeeded({
            oid,limit:20,offset:1,cet:4
        }))
    },
    getComponent(nextState,cb){
        require.ensure([], require => {
            cb(null,require('containers/pages/organize/organizeDetailContainer').default)
        },'organizeDetail')
    }
})

export default detailRoute