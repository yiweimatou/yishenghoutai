import { getLessonTeamInvitedList } from 'actions/lessonTeam'
import { injectReducer } from '../../store/reducers'

const listRoute = store => ({
    path:'list',
    onEnter(){
        if( store.asyncReducers['lessonTeam'] === undefined ) {
            const reducer = require('reducers/lessonTeam').default
            injectReducer(store, {
                key: 'lessonTeam',
                reducer
            })
        }
        store.dispatch( getLessonTeamInvitedList() )
    },
    getComponent(nextState,cb){
        require.ensure([],require=>{
            cb(null,require('containers/pages/lessonTeam/listContainer').default)
        },'listLessonTeam')
    }
})

export default listRoute