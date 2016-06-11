import { reduxForm } from 'redux-form'
import { login } from 'actions/auth'
import { browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import LoginView from 'components/pages/LoginView'
import { isMobile } from 'utils/validation'
import { toastr } from 'react-redux-toastr'

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
    return new Promise((resolve, reject) => {
        dispatch(login(values.mobile, values.pwd)).then(data => {
            if (data.ok) {
                toastr.success('登录成功!')
                let nextPathname = '/'
                const unlisten = browserHistory.listen(
                    location => nextPathname = location.state && location.state.nextPathname
                )
                unlisten()
                dispatch(push(nextPathname || '/'))
            } else {
                return reject(toastr.error(data.msg))
            }
        })
    })
}

export default reduxForm({
    form: 'login',
    validate,
    onSubmit
})(LoginView)