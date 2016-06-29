import { reduxForm,change } from 'redux-form'
import { connect } from 'react-redux'
import EditView from 'pages/yunbook/EditView'
import { fetchAreaByZoomAndPid } from 'actions/yunbook/editView'
import { onEditSubmit } from 'actions/yunbook/editView'

const onSubmit = (values,dispatch) => {
    const yunbook = {
        bid:values.bid,
        aid:values.aid,
        descript:values.descript,
        lbl:values.lbl,
        title:values.title,
        status:values.status
    }
    return new Promise(resolve=>{
        resolve(dispatch( onEditSubmit(yunbook))) 
    })
}

const mapStateToProps = state => ({
    areaSelectProps:{
        areas:state.yunbookEditView.areas,
        select:state.yunbookEditView.select
    },
    yunbook:state.yunbookEditView.detail
})

const mapDispatchToProps = dispatch => ({
    handleChange: (zoom,value) => {
        return dispatch(fetchAreaByZoomAndPid(zoom,value))
    },
    changeLbl:lbl => {
        return dispatch( change('editYunbook','lbl',lbl) )
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    form:'editYunbook',
    onSubmit
})(EditView))






