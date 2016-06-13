import React from 'react'
import { Field,reduxForm } from 'redux-form'
import { RaisedButton } from 'material-ui'
import TextField from '../../ReduxForm/TextField'
import ImageUpload from '../../ImageUpload'

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
    div:{
        display:'flex',
        width:'80%'
    },
    submit:{
        display:'flex',
        width:'80%',
        flexFlow:'row wrap',
        marginTop:30
    }
}

const validate = values => {
    const errors = {}
    if (!values.lname) {
        errors.lname = '请填写课程名称'
    }
    return errors
}

class EditView extends React.Component {
    render (){
        const {
            handleSubmit,submitting,invalid,onChange,imageUrl
        } = this.props
        return (
            <form onSubmit = { handleSubmit } style = { styles.form}>
                <ImageUpload onChange = { onChange } url = { imageUrl }/>
                <Field name = 'lname' 
                        type = 'text'
                        hintText = '课程名称'
                        floatingLabelText = '课程名称'
                        component = {TextField}
                        style = { styles.item }
                />
                <Field name = 'descript'
                        hintText = '课程简介'
                        floatingLabelText = '课程简介'
                        component = { TextField }
                        multiLine = { true }
                        rows = { 2 }
                        style = { styles.item }
                />
                <div style = {styles.submit}>
                    <RaisedButton
                        type = 'submit'
                        label = '提交'
                        primary = { true }
                        disabled = { submitting || invalid }
                    />
                </div>
            </form>
        )
    }
}

EditView.propTypes = {
    handleSubmit:React.PropTypes.func.isRequired,
    submitting:React.PropTypes.bool.isRequired,
    invalid:React.PropTypes.bool.isRequired,
    imageUrl: React.PropTypes.string,
    onChange:React.PropTypes.func.isRequired
}

export default reduxForm({
    form:'editLesson',
    validate
})(EditView)