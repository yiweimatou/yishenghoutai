import {
    reduxForm
} from 'redux-form'
import {
    OK
} from 'constants/api'
import Add from 'components/pages/organize/Add'
import {
    isMobile,
    isUrl
} from '../../../utils/validate'
import {
    addErrorMessage
} from 'actions/error'
import {
    add
} from 'actions/organize'
import { get } from 'actions/user'
import {
    connect
} from 'react-redux'

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
    if (!values.mobile) {
        errors.mobile = '请填写管理员手机号码'
    } else if (!isMobile(values.mobile)) {
        errors.mobile = '请填写正确的手机号码'
    }
    return errors
}

const mapStateToProps = (state)=>{
    return {
        key:state.auth.user.id,
        token:state.auth.user.token
    }
}
const mergeProps = (state) => {
    return {
        onSubmit: (values,dispatch) => {
            return new Promise((resolve, reject) => {
                get({ mobile:values.mobile})
                .then()
                add(state.key,state.token,values)
                    .then(data => {
                        if (data.code === OK) {
                            resolve()
                        } else {
                            return reject(dispatch(addErrorMessage(`新增失败:${data.msg}`)))
                        }
                    })
            })
        }
    }
}

export default connect(mapStateToProps, null,mergeProps)(reduxForm({
    form: 'addOrganize',
    validate
})(Add))