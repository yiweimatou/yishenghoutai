import React from 'react'
import { Field } from 'redux-form'
import { RaisedButton,MenuItem,SelectField as Select } from 'material-ui'
import TextField from '../../ReduxForm/TextField'
import SelectField from '../../ReduxForm/SelectField'
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
    selectDiv:{
        display:'flex',
        justifyContent:'space-between',
        width:'80%'
    },
    submit:{
        display:'flex',
        width:'80%',
        flexFlow:'row wrap',
        marginTop:30
    }
}
const createMenuItems = areas => {
    const items = []
    areas.forEach((area) => {
        items.push(<MenuItem value = { area.aid } key = {area.aid} primaryText = {area.title} />)
    })
    return items
}
class AddView extends React.Component {
	state = {
        select1:0,
        select2:0,
        items5 : createMenuItems(this.props.areas5),
        items6 : createMenuItems(this.props.areas6)
    }
    render() {
        const {
            handleSubmit, 
            submitting, 
            invalid, 
            reset, 
            changeHandler,
            onChange,
            areas5,areas6,areas4
        } = this.props
        const items4 = createMenuItems(areas4)
        let items5 = createMenuItems(areas5)
        let items6 = createMenuItems(areas6)
        let handleChange = (zoom,e,index, value) => {
            changeHandler(value,zoom).then(()=>{
                if(zoom === 5){
                    this.setState({
                        select1 : value
                    })
                    items5 = createMenuItems(areas5)
                }else if (zoom === 6){
                    this.setState({
                        select2:value
                    })
                    items6 = createMenuItems(areas6)
                }
            })
        }
        return (
            <form onSubmit = { handleSubmit } style = { styles.form } >
                <ImageUpload onChange = { onChange } />
                <Field  
                    name = 'title' 
                    type = 'text'
                    hintText = '云板书名称'
                    floatingLabelText = '云板书名称'
                    component = {TextField}
                    style = { styles.item }
                />
                <div style = { styles.selectDiv }>
                    <Select
                        hintText = '云板书分类'
                        floatingLabelText = '云板书分类'
                        value = { this.state.select1 }
                        onChange = { handleChange.bind(null,5) }
                    >
                        { items4 }
                    </Select>
                    <Select
                        hintText = '云板书名称'
                        floatingLabelText = '云板书分类'
                        value = { this.state.select2 }
                        onChange = { handleChange.bind(null, 6) }
                     > 
                        { items5 } 
                    </Select>
                    <Field 
                        floatingLabelText = '云板书分类'
                        hintText = '云板书名称'
                        name = 'aid'
                        component = { SelectField }
                    >
                        { items6 }
                    </Field>
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
    changeHandler:React.PropTypes.func.isRequired
}

export default AddView