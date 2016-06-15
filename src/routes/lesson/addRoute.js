
import { injectReducer } from '../../store/reducers'

const addRoute = store => ({
    path: 'add',
    onEnter() {
        if (store.asyncReducers['upload'] === undefined) {
            const reducer = require('reducers/upload').default
            injectReducer(store, {
                key: 'upload',
                reducer
            })
        }
    },
    getComponent(nextState, cb) {
        require.ensure([], require => {
            cb(null, require('containers/pages/lesson/addLessonContainer').default)
        },'addLesson')
    }
})

export default addRoute