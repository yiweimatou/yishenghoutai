import React from 'react'
import { SelectField,MenuItem } from 'material-ui'

 const styles ={
    selectDiv:{
        display:'flex',
        justifyContent:'space-between',
        width:'100%'
    }
}

const createMenuItems = areas => {
    if( !areas || areas.length === 0) return null
    const items = []
    areas.forEach((area) => {
        items.push(<MenuItem value = { area.aid } key = {area.aid} primaryText = {area.title} />)
    })
    return items
}

class AreaSelect3 extends React.Component {
    state = {
        select:{
            [0]:null,
            [1]:null,
            [2]:null,
            [3]:null
        }
    }
    componentWillReceiveProps(nextProps){
        if (this.props.select&&this.props.select[0] !== nextProps.select[0]) {
            this.setState({
                select: nextProps.select
            })
        }
    }
    render(){
        const {
            areas
        } = this.props
        let items4 = createMenuItems(areas[0])
        let items5 = createMenuItems(areas[1])
        let items6 = createMenuItems(areas[2])
        let items7 = createMenuItems(areas[3])
        const changeHandler = (zoom, value) => {
            if (zoom === 8) {
                return this.setState({
                    select: {
                        ...this.state.select,
                        [3]: value
                    }
                })
            }
            this.props.handleChange(zoom, value).then(() => {
                if (zoom === 5) {
                    this.setState({
                        select: {
                            ...this.state.select,
                            [0]: value
                        }
                    })
                    items5 = createMenuItems(areas[1])
                }else if( zoom === 6){
                    this.setState({
                        select:{
                            ...this.state.select,
                            [1]:value
                        }
                    })
                    items6 = createMenuItems(areas[2])
                }else if(zoom===7){
                    this.setState({
                        select:{
                            ...this.state.select,
                            [2]:value
                        }
                    })
                    items7 = createMenuItems(areas[3])
                }
            })
        }
        
        return(
            <div style ={ styles.selectDiv }>
                <SelectField
                    floatingLabelText = '分类'
                    value = {  this.state.select[0] }
                    onChange = {
                        (event, index, value) =>  changeHandler(5, value)
                    }
                >
                    { items4 }
                </SelectField>
                <SelectField
                    floatingLabelText = '分类'
                    value = {  this.state.select[1] }
                    onChange = {
                        (event, index, value) =>  changeHandler(6, value)
                    }
                >
                    { items5 }
                </SelectField>
                <SelectField
                    floatingLabelText = '分类'
                    value = {  this.state.select[2] }
                    onChange = {
                        (event, index, value) =>  changeHandler(7, value)
                    }
                >
                    { items6 }
                </SelectField>
                <SelectField
                    floatingLabelText = '分类'
                    name = 'aid'
                    value = {  this.state.select[3] }
                    onChange = {
                        (event, index, value) =>  changeHandler(8, value)
                    }
                >
                    { items7 }
                </SelectField>
            </div>
        )
    }
}

AreaSelect3.propTypes = {
    handleChange:React.PropTypes.func.isRequired,
    areas:React.PropTypes.object.isRequired,
    select:React.PropTypes.object 
}

export default AreaSelect3