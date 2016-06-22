import React from 'react'
import { Avatar } from 'material-ui'

const styles ={
    user:{
        margin:10,
        display:'flex',
        alignItems:'center'
    },
    span:{
        margin:10
    }
}
class UserView extends React.Component {
    render(){
        const { user } = this.props
        if( !user ) return (null)
        return (
            <div style = {styles.user}>
            {
                user.face?
                <Avatar src={user.face} size = {60}>
                    {user.admin===1?'主讲':null}
                </Avatar>
                :
                <Avatar size = { 60 }>
                    {user.admin===1?'主讲':null}
                </Avatar>
             }
                <span style={styles.span}>{user.cname || user.nickname || user.mobile}</span>
            </div>
        )
    }
}

UserView.propTypes = {
    user:React.PropTypes.object
}

export default UserView