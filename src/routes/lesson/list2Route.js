import { listTeamLesson } from 'actions/lesson'
import { getLessonTeamList } from 'actions/lessonTeam'

const list2Route = store => ({
    path:'teamlist',
    onEnter(){
        const uid = store.getState().auth.user.id
        store.dispatch( getLessonTeamList({cet:4,uid}) ).then(list=>{
				if( list && list.length > 0){
					list.forEach(item=>{
						store.dispatch ( listTeamLesson({lid:item.lid}) )
					})
				}
			})
    },
    getComponent( nextState,cb ){
        require.ensure([],require => {
                cb(null,require('containers/pages/lesson/listTeamLessonContainer').default)
            },'listTeamLesson')
        }
})

export default list2Route