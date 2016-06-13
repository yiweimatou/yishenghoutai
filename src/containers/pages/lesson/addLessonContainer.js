import { reduxForm,change }  from 'redux-form'
import AddView from 'pages/lesson/AddView'
import { addLesson } from 'actions/lesson'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { listAreaIfNeeded } from 'actions/area'
import { uploadCover } from 'actions/upload'
import { toastr } from 'react-redux-toastr'

const validate = values => {
    const errors = {}
    if (!values.lname) {
        errors.lname = '请填写课程名称'
    }
    if(!values.aid) {
        errors.aid = '请选择分类'
    }
    return errors
}

const onSubmit = (values,dispatch) => {
    if(!values.file){
        return toastr.error('请选择封面')
    }else{
        dispatch(uploadCover(values.file))
        .then( cover => {
            if(cover){
                delete values.file
                values.cover = cover
                dispatch(addLesson(values)).then(lid => {
                    if(lid) {
                        dispatch(push(`/lesson/detail/${lid}`))
                    }
                })
            }
        })
    }
}
const mapStateToProps = state => ({
    areas4 : state.area[4],
    areas5 : state.area[5],
    areas6 : state.area[6]
})

const mapDispatchToProps = dispatch => ({
    changeHandler : (pid,zoom) => {
        return Promise.resolve(dispatch(listAreaIfNeeded({
            pid,zoom
        })))
    },
    onChange : file => {
        dispatch(change('addLesson','file',file))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
	form : 'addLesson',
	validate,
	onSubmit
})(AddView))