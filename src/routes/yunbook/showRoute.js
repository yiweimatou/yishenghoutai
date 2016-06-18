import { getYunbook } from 'actions/yunbook'

const showRoute = store => ({
    path: 'show/:id',
    onEnter(nextState, replace) {
        const bid = nextState.params.id
        if (!bid) {
            return replace({
                pathname: '/'
            })
        }
        store.dispatch( getYunbook(bid) )
    },
    getComponent(nextState,cb){
        require.ensure([],require=>{
            cb(null,require('containers/pages/yunbook/showYunbookContainer').default)
        },'showYunbook')

    }
})

export default showRoute