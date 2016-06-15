import { fetchMyList } from 'actions/organize'
import { toastr } from 'react-redux-toastr'

const listRoute = store => ({
    path: 'list',
    onEnter() {
        store.dispatch(fetchMyList()).then(() => {
            const error = store.getState().organize.errorMessage
            if (error) {
                toastr.error(error)
            }
        })
    },
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('containers/pages/organize/organizeListContainer').default)
        }, 'listOrganize')
    }
})

export default listRoute