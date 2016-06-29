import React from 'react'
import { Field,reduxForm } from 'redux-form'
import TextField from '../../ReduxForm/TextField'
import { RaisedButton,MenuItem,Tabs,Tab } from 'material-ui'
import SelectField from '../../ReduxForm/SelectField'
import SectionAreaSelect from '../../SectionAreaSelect'
import EditLblView from '../yunbook/EditLblView'

const styles = {
    item:{
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
    onClick = ()=>{
        document.querySelector('#_submit').click()
    }
    render(){
        const { 
            handleSubmit,submitting,invalid,
            areas4,
            areas5,
            areas6,
            areas7,
            select,
            yunbook,
            changeLbl
        } = this.props
        return(
            <div>
                <Tabs>
                    <Tab label =  '基本信息编辑'>
                        <form onSubmit = { handleSubmit }>
                            <Field
                                style = { styles.item }
                                name = 'sname'
                                component = {TextField}
                                floatingLabelText = '文章标题'
                                hintText = '文章标题'
                                />
                            <Field
                                name = 'status'
                                style = { styles.item }
                                component = { SelectField }
                                floatingLabelText = '状态'
                                hintText = '状态'
                                >
                                <MenuItem value = {1} primaryText = '隐藏' />
                                <MenuItem value = {2} primaryText = '正常' />
                            </Field>
                            <div style ={ styles.item }>
                                <SectionAreaSelect
                                    areas4 = { areas4 }
                                    areas5 = { areas5 }
                                    areas6 = { areas6 }
                                    areas7 = { areas7 }
                                    select = { select }
                                    />
                            </div>
                            <Field
                                floatingLabelText = '文章描述'
                                hintText = '文章描述'
                                name = 'descript'
                                style = { styles.item }
                                component ={ TextField }
                                rows = { 3 }
                                multiLine = { true }
                                />
                            <button hidden id='_submit' type='submit'/>
                        </form>
                    </Tab>
                    <Tab label = '云板书标注编辑'>
                         <EditLblView yunbook = { yunbook } changeLbl = { changeLbl } />
                    </Tab>
                </Tabs>
                <div style = { styles.submit } >
                    <RaisedButton
                        label = '提交编辑'
                        primary = { true }
                        disabled = { submitting || invalid }
                        onClick = { this.onClick }
                        />
                </div>
            </div>
        )
    }
}

EditView.propTypes = {
    handleSubmit:React.PropTypes.func.isRequired,
    submitting:React.PropTypes.bool.isRequired,
    invalid:React.PropTypes.bool.isRequired,
    onSubmit:React.PropTypes.func.isRequired,
    areas4:React.PropTypes.array.isRequired,
    areas5:React.PropTypes.array.isRequired,
    areas6:React.PropTypes.array.isRequired,
    areas7:React.PropTypes.array.isRequired,
    select:React.PropTypes.array,
    yunbook:React.PropTypes.object,
    changeLbl:React.PropTypes.func
}

const validata = (values) => {
    const errors ={}
    if( !values.sname ){
        errors.sname = '请填写文章标题'
    }
}
export default reduxForm({
    form:'editSection',
    validata
})( EditView )