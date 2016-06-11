import React from 'react'
import {
    Field
} from 'redux-form'
import {
    RaisedButton,
    Paper 
} from 'material-ui'
import TextField from '../ReduxForm/TextField'

const styles = {
    container:{
      display:'flex',
      justifyContent:'center'
    },
    paper:{
        height:300,
        width:500,
        marginTop:200,
        marginBottom:100
    },
    form:{
        display:'flex',
        height:'100%',
        width:'100%',
        flexFlow:'column nowrap',
        justifyContent:'space-around',
        alignItems:'center'        
    }
}
class LoginView extends React.Component {
    static displayName = 'Login'
    render() {
        const {
            handleSubmit,
            submitting,
            invalid
        } = this.props
        
        return ( 
            <div style = { styles.container }>
                <Paper style = { styles.paper }>
                    <form onSubmit = { handleSubmit } style={ styles.form }>
                        <Field name = 'mobile' 
                            type = 'text' hintText = '手机号码' 
                            floatingLabelText = '手机号码' 
                            component = { TextField }
                        />
                        <Field name = 'pwd' 
                            type = 'password' hintText = '密码' 
                            floatingLabelText = '密码'
                             component = { TextField }
                        />
                        <RaisedButton
                            type = 'submit'
                            label = '登录'
                            primary = { true }
                            disabled = { submitting||invalid }
                        />
                    </form>
                </Paper>
            </div>
        )
    }
}

LoginView.propTypes = {
    handleSubmit:React.PropTypes.func.isRequired,
    submitting:React.PropTypes.bool.isRequired,
    onSubmit:React.PropTypes.func.isRequired,
    invalid:React.PropTypes.bool.isRequired
}


export default LoginView