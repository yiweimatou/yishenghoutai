import { getLessonIfNeeded } from 'actions/lesson'

const detailRoute = store => ({
	path : 'detail/:id',
	onEnter(nextState,replace){
		const lid = nextState.params.id
		if(!lid) {
			return replace({
				pathname:'/'
			})
		} 
		store.dispatch(getLessonIfNeeded({
			lid
		})).then( ()=> {
			const detail =  store.getState().lesson.detail
			if(!detail){
				replace({
					pathname:'/'
				})
				return Promise.reject()
			}else {
				return Promise.resolve()
			}
		})
	},
	getComponent(nextState,cb){
		require.ensure([], require => {
            cb(null, require('containers/pages/lesson/detailLessonContainer').default)
        }, 'detailLesson')
	}
})

export default detailRoute