import React from 'react'
import {
    TextField,
    RaisedButton,
    FloatingActionButton
} from 'material-ui'
import UserView from '../../UserView'
import { isMobile } from 'utils/validation'

const styles = {
    divRoot : {
        whiteSpace:'nowrap',
        width:'88%',
        paddingBottom:20
    },
    divUser: {
       display:'flex',
       justifyContent:'space-between'
    },
    divNotFound:{
        height:150,
        width:'100%',
        textAlign:'center'
    },
    span:{
        color:'white'
    }
}
class SelectView extends React.Component {
    searchHandler = () => {
        const mobile = document.querySelector('#_mobile').value
        if( !isMobile(mobile) ) return
        this.props.userSearchHandler(mobile)
    }
    render(){
        const { user,inviteHandler } = this.props
        return(
            <div>
                <div style ={ styles.divRoot } >
                    <TextField
                        fullWidth = { true }
                        id = '_mobile'
                        hintText = '请输入用户手机号'
                        floatingLabelText = '手机号' 
                    />
                    <RaisedButton
                        primary ={ true }
                        label = '搜索'
                        onClick = { this.searchHandler }
                    />
                </div>
                {
                    user?
                    <div style = { styles.divUser }>
                        <UserView
                            user = { user } 
                        />
                        <div>
                            <FloatingActionButton
                                mini ={ true }
                                onClick = { ()=>inviteHandler(user.mobile) }
                            >
                                <span style = {styles.span}>
                                    邀请
                                </span>
                            </FloatingActionButton>
                        </div>
                    </div>
                    :
                    <div style = { styles.divNotFound }>
                        <h2>没有用户显示</h2>
                    </div>
                }
            </div>
        )
    }
}

SelectView.propTypes = {
    user:React.PropTypes.object,
    inviteHandler:React.PropTypes.func.isRequired,
    userSearchHandler:React.PropTypes.func.isRequired
}

export default SelectView