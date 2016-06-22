import { reduxForm } from 'redux-form'
import { login } from 'actions/auth'
import { browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import LoginView from 'components/pages/LoginView'
import { isMobile } from 'utils/validation'


const validate = values => {
    const errors = {}
    if (!values.mobile) {
        errors.mobile = '请填写手机号码'
    } else if (!isMobile(values.mobile)) {
        errors.mobile = '请输入正确的手机号码'
    }
    if (!values.pwd) {
        errors.pwd = '请填写密码'
    }
    return errors
}
const onSubmit = (values, dispatch) => {
    return new Promise((resolve) => {
        dispatch(login(values.mobile, values.pwd)).then(data => {
            if (data.ok) {
                let nextPathname = '/'
                const unlisten = browserHistory.listen(
                    location => nextPathname = location.state && location.state.nextPathname
                )
                unlisten()
                dispatch(push(nextPathname || '/'))
                resolve()
            }
        })
    })
}

export default reduxForm({
    form: 'login',
    validate,
    onSubmit
})(LoginView)