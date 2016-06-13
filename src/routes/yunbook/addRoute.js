import { listAreaIfNeeded } from 'actions/area'
import { injectReducer } from '../../store/reducers'

const addRoute = store => ({
	path:'add',
	onEnter() {
		if (store.asyncReducers['area'] === undefined) {
            const reducer = require('reducers/area').default
            injectReducer(store, {
                key: 'area',
                reducer
            })
        }
        if (store.asyncReducers['upload'] === undefined) {
            const reducer = require('reducers/upload').default
            injectReducer(store, {
                key: 'upload',
                reducer
            })
        }
        store.dispatch(listAreaIfNeeded({
            pid: 1,
            zoom: 4
        }))
	},
	getComponent(nextState,cb ){
		require.ensure([],require => {
			cb(null,require('containers/pages/yunbook/addYunbookContainer').default)
		},'addYunbook')
	}
})

export default addRoute