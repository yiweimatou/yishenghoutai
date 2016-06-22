import { listLesson } from 'actions/lesson'

const listRoute = store => ({
	path:'list',
	onEnter(){
		const uid = store.getState().auth.user.id
		if(store.getState().lesson.list.length === 0){
			store.dispatch(listLesson({
				uid
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