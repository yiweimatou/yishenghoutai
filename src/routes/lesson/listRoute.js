import { listLesson } from 'actions/lesson'

const listRoute = store => ({
	path:'list',
	onEnter(){
		if(store.getState().lesson.list.length === 0){
			store.dispatch(listLesson({
				uid:store.getState().auth.user.id
			}))
		}
	},
	getComponent(nextState,cb){
		require.ensure([],require => {
			cb(null,require('containers/pages/lesson/listLessonContainer').default)
		},'listLesson')
	}
})

export default listRoute