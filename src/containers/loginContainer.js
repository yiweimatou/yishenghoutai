import {
    SubmissionError,
    reduxForm
} from 'redux-form'
import {
    login
} from '../actions/auth'
import {
    OK
} from '../constants/api'
import {
    browserHistory
} from 'react-router'
import {
    push
} from 'react-router-redux'
import Login from '../components/pages/Login'

const validate = values => {
    const errors = {}
    if (!values.account) {
        errors.account = '请填写帐号'
    }
    if (!values.pwd) {
        errors.pwd = '请填写密码'
    }
    return errors
}
const onSubmit = (values, dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(login(values.account, values.pwd)).then(data => {
            if (data.code === OK) {
                const unlisten = browserHistory.listen(
                    location => dispatch(push(
                        location.state.nextPathname ?
                        location.state.nextPathname : '/'
                    ))
                )
                unlisten()
                resolve()
            } else {

                return reject(new SubmissionError({
                    pwd: data.message
                }))
            }
        })
    })
}

export default reduxForm({
    form:'login',
    validate,
    onSubmit
})(Login)