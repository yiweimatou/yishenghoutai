import React from 'react'
import { Field } from 'redux-form'
import { RaisedButton,MenuItem,TextField as Text } from 'material-ui'
import TextField from '../../ReduxForm/TextField'
import SelectField from '../../ReduxForm/SelectField'
import AreaSelect2 from '../../AreaSelect2'


const styles = {
	form:{
        display:'flex',
        flexFlow:'column wrap',
        alignItems:'center'
    },
    item:{
        width:'100%'
    },
    margin:{
        marginLeft:20
    },
    selectDiv:{
        display:'flex',
        justifyContent:'space-between',
        width:'100%'
    },
    submit:{
        display:'flex',
        width:'100%',
        flexFlow:'row wrap',
        marginTop:30
    }
}
class AddView extends React.Component {
    render() {
        const {
            submitting, 
            invalid, 
            changeHandler,
            areas5,areas6,areas4,areas7,
            reset,
            handleSubmit,
            onChange
        } = this.props
        return (
            <form style = { styles.form } onSubmit={handleSubmit} >
                <Field  
                    name = 'title' 
                    type = 'text'
                    hintText = '云板书名称'
                    floatingLabelText = '云板书名称'
                    component = {TextField}
                    style = { styles.item }
                />
                <Field  
                    name = 'status' 
                    type = 'text'
                    hintText = '云板书状态'
                    floatingLabelText = '云板书状态'
                    component = {SelectField}
                    style = { styles.item }
                >
                    <MenuItem
                        primaryText = '仅自己可见'
                        value = { 1 } 
                    />
                    <MenuItem primaryText = '所有人可见' value={2}/>
                </Field>
                <Text 
                    id = '_file'
                    type = 'file'
                    style = { styles.item }
                    onChange = { (e)=>onChange(e.target.files[0])}
                />
                <div style={ styles.item }>
                    <AreaSelect2
                        changeHandler = { changeHandler }
                        areas4 = { areas4 }
                        areas5 = { areas5 }
                        areas6 = { areas6 }
                        areas7 = { areas7 }
                    />
                </div>
                <Field name = 'descript'
                        hintText = '云板书简介'
                        floatingLabelText = '云板书简介'
                        component = { TextField }
                        multiLine = { true }
                        rows = { 2 }
                        style = { styles.item }
                />
                <div style = { styles.submit } >
                    <RaisedButton 
                        type = 'submit'
                        label = '提交新建'
                        primary = { true }
                        disabled = { submitting || invalid }
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

AddView.propTypes = {
    handleSubmit:React.PropTypes.func.isRequired,
    onChange:React.PropTypes.func.isRequired,
    submitting:React.PropTypes.bool.isRequired,
    reset:React.PropTypes.func.isRequired,
    invalid:React.PropTypes.bool.isRequired,
    areas4:React.PropTypes.array.isRequired,
    areas5:React.PropTypes.array.isRequired,
    areas6:React.PropTypes.array.isRequired,
    changeHandler:React.PropTypes.func.isRequired,
    areas7:React.PropTypes.array.isRequired
}

export default AddView