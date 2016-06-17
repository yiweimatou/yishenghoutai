import {
    injectReducer
} from '../../store/reducers.js'

const sectionRoute = store => ({
    path : 'section',
    onEnter(){
        if( store.asyncReducers['section'] === undefined ) {
            const reducer = require('reducers/section').default
            injectReducer(store, {
                key: 'section',
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
    },
    childRoutes:[
        require('./addRoute').default(store)
    ]
})

export default sectionRoute