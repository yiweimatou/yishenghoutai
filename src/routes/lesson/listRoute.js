import { listLesson } from 'actions/lesson'
import { getLessonTeamList } from 'actions/lessonTeam'

const listRoute = store => ({
	path:'list',
	onEnter(){
		const uid = store.getState().auth.user.id
		if(store.getState().lesson.list.length === 0){
			store.dispatch(listLesson({
				uid
			}))
			store.dispatch( getLessonTeamList({cet:4,uid}) ).then(list=>{
				if( list && list.length > 0){
					list.forEach(item=>{
						store.dispatch ( listLesson(item.lid) )
					})
				}
			})
		}
	},
	getComponent(nextState,cb){
		require.ensure([],require => {
			cb(null,require('containers/pages/lesson/listLessonContainer').default)
		},'listLesson')
	}
})

export default listRoute