import { injectReducer } from '../../store/reducers'

const yunbookRoute = store => ({
	path:'yunbook',
	onEnter(){
		if (store.asyncReducers['yunbook'] === undefined) {
            const reducer = require('reducers/yunbook').default
            injectReducer(store, {
                key: 'yunbook',
                reducer
            })
        }
	},
	childRoutes:[
		require('./addRoute').default(store),
		require('./listRoute').default(store),
		require('./showRoute').default( store )
	]
})

export default yunbookRoute