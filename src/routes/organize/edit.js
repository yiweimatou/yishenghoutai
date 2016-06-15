import { getOrganizeIfNeeded } from 'actions/organize'
import {
    initialize
} from 'redux-form'

const editRoute = store => ({
    path: 'edit/:id',
    onEnter(nextState, replace) {
        const oid = nextState.params.id
        if (oid) {
            store.dispatch(getOrganizeIfNeeded({
                oid
            })).then(() => {
                const organize = store.getState().organize.detail
                if (organize === null) {
                    replace({
                        pathname: '/'
                    })
                } else {
                    store.dispatch(initialize('editOrganize', organize))
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
            cb(null, require('containers/pages/organize/editOrganizeContainer').default)
        },'editOrganize')
    }
})

export default editRoute