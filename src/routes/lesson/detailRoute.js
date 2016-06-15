import { getLessonIfNeeded } from 'actions/lesson'
import { injectReducer } from '../../store/reducers'
import { fetchList,getOrganizeInfo } from 'actions/organize'
import { getLessonTeamList } from 'actions/lessonTeam'

const detailRoute = store => ({
	path : 'detail/:id',
	onEnter(nextState,replace){
		const lid = nextState.params.id
		if(!lid) {
			return replace({
				pathname:'/'
			})
		}
		if (store.asyncReducers['organize'] === undefined) {
            const reducer = require('reducers/organize').default
            injectReducer(store, {
                key: 'organize',
                reducer
            })
        } 
		if (store.asyncReducers['user'] === undefined) {
            const reducer = require('reducers/user').default
            injectReducer(store, {
                key: 'user',
                reducer
            })
        } 
		if (store.asyncReducers['lessonTeam'] === undefined) {
            const reducer = require('reducers/lessonTeam').default
            injectReducer(store, {
                key: 'lessonTeam',
                reducer
            })
        } 
		store.dispatch( getLessonTeamList( lid ) )
		store.dispatch( getOrganizeInfo() )
		store.dispatch( fetchList({
			limit:4,
			offset:1
		}) )
		store.dispatch(getLessonIfNeeded({
			lid
		})).then( ()=> {
			const detail =  store.getState().lesson.detail
			if(!detail){
				replace({
					pathname:'/'
				})
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