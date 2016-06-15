import {
    injectReducer
} from '../../store/reducers.js'
import { listAreaIfNeeded } from 'actions/area'

const lessonRoute = store => ({
	path: 'lesson',
	onEnter() {
		if( store.asyncReducers['lesson'] === undefined ) {
            const reducer = require('reducers/lesson').default
            injectReducer(store, {
                key: 'lesson',
                reducer
            })
        }
		if (store.asyncReducers['area'] === undefined) {
            const reducer = require('reducers/area').default
            injectReducer(store, {
                key: 'area',
                reducer
            })
        }
        store.dispatch(listAreaIfNeeded({
            pid: 1,
            zoom: 4
        }))
	},
	childRoutes:[
		require('./addRoute').default(store),
		require('./listRoute').default(store),
		require('./editRoute').default(store),
		require('./detailRoute').default(store)
	]
})

export default lessonRoute