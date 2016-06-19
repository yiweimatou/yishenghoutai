import { listLesson } from 'actions/lesson'

const list2Route = store => ({
    path:'/list2',
    onEnter(){

    },
    getComponent( nextState,cb ){
        require.ensure([],require => {
                cb(null,require('containers/pages/lesson/listLessonContainer').default)
            },'listLesson')
        }
    }
})