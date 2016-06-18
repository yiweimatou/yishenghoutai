import React from 'react'
import { Field } from 'redux-form'
import { Paper,Dialog,RaisedButton,TextField as Text } from 'material-ui'
import TextField from '../../ReduxForm/TextField'
import SectionAreaSelect from '../../SectionAreaSelect'
import SelectView from '../yunbook/SelectView'

const styles ={
    selectDiv:{
        display:'flex',
        justifyContent:'space-between',
        width:'90%'
    },
    paper:{
        padding:20
    },
    form:{
        display:'flex',
        flexFlow:'column wrap',
        alignItems:'center'
    },
    item:{
        width:'90%'
    },
    submit:{
        display:'flex',
        width:'90%',
        flexFlow:'row wrap',
        marginTop:30
    },
    margin:{
        marginLeft:30
    }
}
class AddView extends React.Component {
    state = {
        open :false
    }
    openHandler = () => {
        this.setState({
            open:!this.state.open
        })
    }
    handlerSelectId = (id,name) => {
        this.refs.bname.input.value = name
        this.props.selectIdHandler(id,this.openHandler)
    }
    render(){
        const {
            areas4,
            areas5,
            areas6,
            areas7,
            select,
            listProps,
            onPageClick,
            myOnPageClick,
            submitting,
            invalid,
            reset,
            handleSubmit
        } = this.props
        return (
            <Paper style = { styles.paper }>
                <form onSubmit = { handleSubmit } style = { styles.form } >
                    <Field 
                        name = 'sname'
                        hintText = '文章标题'
                        floatingLabelText = '文章标题'
                        component = { TextField }
                        style = { styles.item }
                    />
                    <div style ={ styles.item }>
                        <SectionAreaSelect
                            areas4 = { areas4 }
                            areas5 = { areas5 }
                            areas6 = { areas6 }
                            areas7 = { areas7 }
                            select = { select }
                        />        
                    </div>
                    <Text 
                        ref = 'bname'
                        hintText = '选择云板书'
                        floatingLabelText = '选择云板书'
                        onClick = { this.openHandler }
                        style = { styles.item }
                    />
                    <Field
                        name = 'bid'
                        style = {{display:'none'}}
                        component = { TextField }
                    />
                    <Field 
                        name = 'descript'
                        hintText = '文章摘要'
                        floatingLabelText = '文章摘要'
                        multiLine = { true }
                        rows = { 3 }
                        component = { TextField }
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
                <Dialog
                    title = '选择云板书'
                    open = { this.state.open }
                    autoScrollBodyContent={true}
                    onRequestClose = { this.openHandler }
                >
                    <SelectView
                        {...listProps}
                         onPageClick = { onPageClick }
                         myOnPageClick = { myOnPageClick }
                         selectIdHandler = { 
                             this.handlerSelectId 
                        }
                    />
                </Dialog>
            </Paper>
        )
    }
}

AddView.propTypes = {
    areas4:React.PropTypes.array.isRequired,
    areas5:React.PropTypes.array.isRequired,
    areas6:React.PropTypes.array.isRequired,
    areas7:React.PropTypes.array.isRequired,
    select:React.PropTypes.array,
    listProps:React.PropTypes.object,
    onPageClick:React.PropTypes.func.isRequired,
    myOnPageClick:React.PropTypes.func.isRequired,
    selectIdHandler:React.PropTypes.func,
    handleSubmit:React.PropTypes.func.isRequired,
    submitting:React.PropTypes.bool.isRequired,
    reset:React.PropTypes.func.isRequired,
    invalid:React.PropTypes.bool.isRequired
}

export default AddView