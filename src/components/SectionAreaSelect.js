import React from 'react'
import { SelectField,MenuItem } from 'material-ui'
import { Field } from 'redux-form'
import Select from './ReduxForm/SelectField'

const styles ={
    selectDiv:{
        display:'flex',
        justifyContent:'space-between'
    }
}
const createMenuItems = areas => {
    const items = []
    areas.forEach((area) => {
        items.push(<MenuItem value = { area.aid } key = {area.aid} primaryText = {area.title} />)
    })
    return items
}
class AreaSelect extends React.Component {
    state = {
        select1:null,
        select2:null,
        select3:null
    }
    componentWillReceiveProps(){
        if( !this.state.select1 ){
            this.setState({
                select1:this.props.select[0],
                select2:this.props.select[1],
                select3:this.props.select[2]
            })
        }
    }
    render(){
        const {
            areas4,areas5,areas6,areas7,changeHandler,select 
        } = this.props
        let items4 = createMenuItems(areas4)
        let items5 = createMenuItems(areas5)
        let items6 = createMenuItems(areas6)
        let items7 = createMenuItems(areas7)
        const handleChange = (zoom,value) => {
            changeHandler(value,zoom).then(
                ()=>{
                    if( zoom === 5 ){
                        this.setState({
                            select1:value
                        })
                        items5 = createMenuItems(areas5)
                    }else if(zoom === 6) {
                        this.setState({
                            select2:value
                        })
                        items6 = createMenuItems(areas6)
                    }else if( zoom === 7){
                        this.setState({
                            select3:value
                        })
                        items7 = createMenuItems(areas7)
                    }
                })
        }
        return (
            <div style = { styles.selectDiv } >
                <SelectField
                    floatingLabelText = '分类'
                    value = { this.state.select1 }
                    onChange = { 
                        (event,index,value) => {
                            handleChange(5,value)
                        }
                    }
                >
                { items4 }
                </SelectField>
                <SelectField
                    ref = 'select2'
                    floatingLabelText = '分类'
                    value = { this.state.select2 }
                    onChange = { 
                        (event,index,value) => handleChange(6,value)
                    }
                >
                { items5 }
                </SelectField>
                <SelectField
                    ref = 'select3'
                    floatingLabelText = '分类'
                    value = { this.state.select3 }
                    onChange = { 
                        (event,index,value) => handleChange(7,value)
                    }
                >
                { items6 }
                </SelectField>
                <Field
                    name = 'aid'
                    floatingLabelText = '分类'
                    component = { Select }
                >
                    { items7 }
                </Field>
            </div>
        )
    }
}

AreaSelect.propTypes = {
    changeHandler:React.PropTypes.func.isRequired,
    areas4:React.PropTypes.array.isRequired,
    areas5:React.PropTypes.array.isRequired,
    areas6:React.PropTypes.array.isRequired,
    areas7:React.PropTypes.array.isRequired,
    select:React.PropTypes.array
}

export default AreaSelect