import { reduxForm,change } from 'redux-form'
import AddView from 'pages/yunbook/AddView'
import { addYunbook } from 'actions/yunbook'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { listAreaIfNeeded } from 'actions/area'
import { uploadYunbook } from 'actions/upload'
import { toastr } from 'react-redux-toastr'

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = '请填写云板书名称'
    }
    if(!values.aid) {
        errors.aid = '请选择分类'
    }
    return errors
}

const onSubmit = (values,dispatch) => {
    return new Promise((resolve,reject) => {
        if(!values.file){
            return reject(toastr.error('请选择封面'))
        }
        dispatch(uploadYunbook(values.file))
            .then( data => {
                if(data){
                    delete values.file
                    values.cover = data.cover
                    values.width = data.width
                    values.height = data.height
                    values.zoom = data.zoom
                    values.path = data.path
                    dispatch(addYunbook(values)).then(bid => {
                        if (bid) {
                            dispatch(push(`/yunbook/show/${bid}`))
                        }
                    })
                }else{
                    return reject()
                }
            })
    })
}
const mapStateToProps = state => ({
    areas4 : state.area[4],
    areas5 : state.area[5],
    areas6 : state.area[6]
})

const mapDispatchToProps = dispatch => ({
    changeHandler : (pid,zoom) => {
        return dispatch(listAreaIfNeeded({
            pid,zoom
        }))
    },
    onChange : file => {
        dispatch(change('addYunbook','file',file))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
	form : 'addYunbook',
	validate,
	onSubmit
})(AddView))
