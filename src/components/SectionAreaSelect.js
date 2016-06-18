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
    render(){
        const {
            areas4,areas5,areas6,areas7,select 
        } = this.props
        const items4 = createMenuItems(areas4.filter(area=>area.aid===select[0]))
        const items5 = createMenuItems(areas5.filter(area=>area.aid===select[1]))
        const items6 = createMenuItems(areas6.filter(area=>area.aid===select[2]))
        const items7 = createMenuItems(areas7)
        return (
            <div style = { styles.selectDiv } >
                <SelectField
                    floatingLabelText = '分类'
                    value = { select[0] }
                >
                { items4 }
                </SelectField>
                <SelectField
                    floatingLabelText = '分类'
                    value = { select[1] }
                >
                { items5 }
                </SelectField>
                <SelectField
                    floatingLabelText = '分类'
                    value = { select[2] }
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
    areas4:React.PropTypes.array.isRequired,
    areas5:React.PropTypes.array.isRequired,
    areas6:React.PropTypes.array.isRequired,
    areas7:React.PropTypes.array.isRequired,
    select:React.PropTypes.array
}

export default AreaSelect