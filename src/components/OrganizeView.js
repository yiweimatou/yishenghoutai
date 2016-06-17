import React from 'react'
import { Avatar } from 'material-ui'

class OrganizeView extends React.Component {
    render(){
        const { organize } = this.props
        if( !organize ) return (null)
        return (
            <div>
                <Avatar src = { organize.logo } size = { 60 }/>
                <span>{ organize.oname }</span>
            </div>
        )
    }
}

OrganizeView.propTypes = {
    organize:React.PropTypes.object
}

export default OrganizeView