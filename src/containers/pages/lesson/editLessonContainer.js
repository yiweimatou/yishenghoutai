import { reduxForm } from 'redux-form'
import { editLesson } from 'actions/lesson'
import { isUrl } from 'utils/validation'
import EditView from 'pages/lesson/EditView'

const validate = values => {
    const errors = {}
    if (!values.lname) {
        errors.lname = '请填写课程名称'
    }
    if (!values.cover) {
        errors.cover = '请填写封面地址'
    } else if (!isUrl(values.cover)) {
        errors.cover = '请填写正确的url地址'
    }
    return errors
}

const onSubmit = (values,dispatch) => {
	dispatch(editLesson(values))
}

export default reduxForm({
	form: 'editLesson',
	validate,
	onSubmit
})(EditView)