import React from 'react'
import { Field } from 'redux-form'
import { RaisedButton,MenuItem,Tabs,Tab} from 'material-ui'
import TextField from '../../ReduxForm/TextField'
import SelectField from '../../ReduxForm/SelectField'
import AreaSelect3 from '../../AreaSelect3'
import EditLblView from './EditLblView'

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
class EditView extends React.Component{
    onClick(){
        document.querySelector('#_submit').click()
    }
    render(){
        const {
            submitting, 
            invalid, 
            handleSubmit,
            areaSelectProps,
            handleChange,
            changeLbl,
            yunbook
        } = this.props
        return (
            <div>
                <Tabs>
                    <Tab label="云板书基础信息编辑">
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
                            <AreaSelect3
                                {...areaSelectProps}
                                handleChange={ handleChange }
                                />
                            <Field name = 'descript'
                                hintText = '云板书简介'
                                floatingLabelText = '云板书简介'
                                component = { TextField }
                                multiLine = { true }
                                rows = { 2 }
                                style = { styles.item }
                                />
                            <button type='submit' id = '_submit' hidden/>
                        </form>
                    </Tab>
                    <Tab label="标注编辑">
                        <EditLblView
                            changeLbl = { changeLbl } 
                            yunbook = { yunbook }
                        />
                    </Tab>
                </Tabs>
                <div style = { styles.submit } >
                    <RaisedButton
                        label = '保存编辑'
                        primary = { true }
                        disabled = { submitting || invalid }
                        onClick = { this.onClick }
                        />
                </div>
            </div>
        )
    }
}

EditView.propTypes ={
    handleSubmit:React.PropTypes.func.isRequired,
    submitting:React.PropTypes.bool.isRequired,
    invalid:React.PropTypes.bool.isRequired,
    areaSelectProps:React.PropTypes.object,
    handleChange:React.PropTypes.func.isRequired,
    yunbook:React.PropTypes.object,
    changeLbl:React.PropTypes.func.isRequired
}

export default EditView
