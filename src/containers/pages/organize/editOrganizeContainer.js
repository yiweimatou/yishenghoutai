import { reduxForm,change } from 'redux-form'
import EditView from 'pages/organize/EditView'
import {
    isUrl
} from 'utils/validation'
import { editOrganize } from 'actions/organize'
import { connect } from 'react-redux'
import { uploadCover } from '../../../actions/upload'

const validate = values => {
    const errors = {}
    if (!values.oname) {
        errors.oname = '请填写机构名称'
    }
    if (!values.state) {
        errors.state = '请选择机构状态'
    }
    if (!values.logo) {
        errors.logo = '请填写logo'
    } else if (!isUrl(values.logo)) {
        errors.logo = '请填写正确的url地址'
    }
    return errors
}

const onSubmit = (values, dispatch) => {
    const organize = {
        oid:values.oid,
        category:values.category,
        oname:values.oname,
        uid:values.uid,
        state:values.state,
        descript:values.descript,
        logo:values.logo
    }
    return new Promise((resolve) => {
        if( values.file ){
            dispatch( uploadCover(values.file) ).then(logo=>{
                if( logo ){
                    organize.logo = logo
                    dispatch( editOrganize(organize) ).then(()=>{
                        resolve()
                    })
                }
            })
        } else {
            dispatch(editOrganize(values)).then(()=>{
                resolve()
            })
        }
    })
}

const mapStateToProps = state => ({
    organize : state.organize.detail
})

const mapDispatchToProps = dispatch => ({
    onChange: file => {
        dispatch(change('editOrganize','file',file))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
	form:'editOrganize',
	validate,
	onSubmit
})(EditView))