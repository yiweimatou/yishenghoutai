import React from 'react'
import { Paper } from 'material-ui'

const styles = {
    paper :{
        display:'flex',
        padding:10,
        justifyContent:'space-between',
        width:'50%'
    }
}
class SectionView extends React.Component {
    render(){
        const {
            section   
        } = this.props
        return (
            <Paper style = { styles.paper } >
                <span>{section.sname}</span>
                <span>{new Date(section.add_ms).toDateString()}</span>
            </Paper>
        )
    }
}

SectionView.propTypes = {
    section:React.PropTypes.object
}

export default SectionView