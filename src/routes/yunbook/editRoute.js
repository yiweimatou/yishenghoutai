import { fetchYunbookById } from 'actions/yunbook/editView'
import { injectReducer } from 'store/reducers'
import { initialize } from 'redux-form'
import { fetchSelectedArea } from 'actions/yunbook/editView'

const editRoute = store => ({
    path:'edit/:id',
    onEnter(nextState,replace){
        const id = nextState.params.id
        if( !id ){
            return replace({
                pathname:'/'
            })
        }
        if (!store.getState().yunbookEditView) {
            const reducer = require('reducers/yunbook/editView').default
            injectReducer(store, {
                key: 'yunbookEditView',
                reducer
            })
        } 
        store.dispatch( fetchYunbookById(id) ).then(()=>{
            const _yunbook = store.getState().yunbookEditView.detail
            if( _yunbook ){
                 store.dispatch( initialize('editYunbook',_yunbook))
                 store.dispatch( fetchSelectedArea(_yunbook.aid) )
            }
        })
    },
    getComponent(nextState,cb){
        require.ensure([],require=>{
            cb(null,require('../../containers/pages/yunbook/editYunbookContainer').default)
        },'editYunbook')
    }
})

export default editRoute