import { getLessonIfNeeded } from 'actions/lesson'
import { initialize } from 'redux-form'

const editRoute = store => ({
    path: 'edit/:id',
    onEnter(nextState, replace){
        const lid = nextState.params.id
        if (lid) {
            store.dispatch(getLessonIfNeeded({
                lid
            })).then(() => {
                const lesson = store.getState().lesson.detail
                if (lesson === null) {
                    replace({
                        pathname: '/'
                    })
                } else {
                    store.dispatch(initialize('editLesson', lesson))
                }
            })
        } else {
            replace({
                pathname: '/'
            })
        }
    },
    getComponent(nextState, cb) {
        require.ensure([], require => {
            cb(null, require('containers/pages/lesson/editLessonContainer').default)
        }, 'editLesson')
    }
})

export default editRoute