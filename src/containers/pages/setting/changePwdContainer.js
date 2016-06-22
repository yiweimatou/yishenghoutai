import { reduxForm } from 'redux-form'
import ChangepwdView from 'components/pages/setting/ChangePwdView'
import { changepwd } from 'actions/auth'

const validate = values => {
    const errors = {}
    if (!values.pwd) {
        errors.pwd = '请填写密码'
    }
    if(!values.oldpwd){
        errors.oldpwd = '请填写原先密码'
    }
    return errors
}

const onSubmit = (values, dispatch) => {
    return new Promise((resolve) => {
        resolve( dispatch(changepwd(values.oldpwd,values.pwd)) )
    })
}

export default reduxForm({
    form:'changePwd',
    validate,
    onSubmit
})(ChangepwdView) 