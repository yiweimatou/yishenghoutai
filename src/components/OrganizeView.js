import React from 'react'
import { Avatar } from 'material-ui'

const styles ={
    div:{
        margin:10,
        display:'flex',
        alignItems:'center'
    },
    span:{
        margin:10
    }
}
class OrganizeView extends React.Component {
    render(){
        const { organize } = this.props
        if( !organize ) return (null)
        return (
            <div style={styles.div}>
                <Avatar src = { organize.logo } size = { 60 }/>
                <span style={styles.span}>{ organize.oname }</span>
            </div>
        )
    }
}

OrganizeView.propTypes = {
    organize:React.PropTypes.object
}

export default OrganizeView