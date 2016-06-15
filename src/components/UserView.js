import React from 'react'
import { Avatar } from 'material-ui'

class UserView extends React.Component {
    render(){
        const { user } = this.props
        if( !user ) return (null)
        return (
            <div>
            {
                user.face?
                <Avatar src={user.face}>
                    {user.admin===1?'主讲':null}
                </Avatar>
                :
                <Avatar size = { 60 }>
                    {user.admin===1?'主讲':null}
                </Avatar>
             }
                <span>{user.canme || user.nickname || user.mobile}</span>
            </div>
        )
    }
}

UserView.propTypes = {
    user:React.PropTypes.object
}

export default UserView