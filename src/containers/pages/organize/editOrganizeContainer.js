import { reduxForm } from 'redux-form'
import EditView from 'pages/organize/EditView'
import {
    isUrl
} from 'utils/validation'
import { editOrganize } from 'actions/organize'

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
    return new Promise(() => {
        dispatch(editOrganize(values))
    })
}

export default reduxForm({
	form:'editOrganize',
	validate,
	onSubmit
})(EditView)