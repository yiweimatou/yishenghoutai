import { getYunbookListIfNeeded,getYunbookInfo } from 'actions/yunbook'

const listRoute = store => ({
    path:'list',
    onEnter(){
        const yunbookState = store.getState().yunbook
        if( yunbookState.list.length === 0 ){
            store.dispatch( getYunbookInfo( { } ) )
            store.dispatch( getYunbookListIfNeeded({
                offset:yunbookState.offset,
                limit:yunbookState.limit
            }) )
        }
    },
    getComponent(nextState,cb){
        require.ensure([],require => {
            cb(null,require('../../containers/pages/yunbook/listYunbookContainer').default)
        })
    }
})

export default listRoute