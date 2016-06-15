import { getOrganizeIfNeeded } from 'actions/organize'

const detailRoute = store => ({
    path:'detail/:id',
    onEnter(nextState,replace){
        const oid = nextState.params.id
        if( !oid ){
            return replace({
                pathname:'/'
            })
        }
        store.dispatch( getOrganizeIfNeeded({
            oid
        }))
    },
    getComponent(nextState,cb){
        require.ensure([], require => {
            cb(null,require('containers/pages/organize/organizeDetailContainer').default)
        },'organizeDetail')
    }
})

export default detailRoute