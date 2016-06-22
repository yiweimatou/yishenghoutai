import React from 'react'
import { Field } from 'redux-form'
import { RaisedButton } from 'material-ui'
import TextField from '../../ReduxForm/TextField'

const styles = {
    form:{
        display:'flex',
        flexFlow:'column wrap',
        alignItems:'center'
    },
    item:{
        width:'80%'
    },
    margin:{
        marginLeft:20
    },
    submit:{
        display:'flex',
        width:'80%',
        flexFlow:'row wrap',
        marginTop:30
    }
}
class ChangepwdView extends React.Component {
	render(){
		const {
            handleSubmit,submitting,invalid,reset
        } = this.props
		return(
			<form onSubmit = { handleSubmit } style = { styles.form }>
				<Field name = 'oldpwd'
                    hintText = '原密码'
                    floatingLabelText = '原密码'
                    type = 'password'
                    component = { TextField }
                    style = { styles.item }
                />
                <Field name = 'pwd'
                    hintText = '密码'
                    floatingLabelText = '密码'
                    type = 'password'
                    component = { TextField }
                    style = { styles.item }
                />
                <div style = {styles.submit}>
                    <RaisedButton
                        type = 'submit'
                        label = '提交'
                        primary = { true }
                        disabled = { submitting||invalid }
                    />
                    <RaisedButton
                        label = '取消'
                        onClick = { reset }
                        style = { styles.margin }
                    />
                </div>
			</form>
		)
	}
}

ChangepwdView.propTypes = {
    handleSubmit : React.PropTypes.func.isRequired,
    submitting : React.PropTypes.bool.isRequired,
    invalid : React.PropTypes.bool.isRequired,
    reset : React.PropTypes.func.isRequired
}

export default ChangepwdView