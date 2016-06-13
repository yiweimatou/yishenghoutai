import {
    injectReducer
} from '../../store/reducers.js'

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
	},
	childRoutes:[
		require('./addRoute').default(store),
		require('./listRoute').default(store),
		require('./editRoute').default(store),
		require('./detailRoute').default(store)
	]
})

export default lessonRoute