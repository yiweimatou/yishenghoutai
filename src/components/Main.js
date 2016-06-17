import React from 'react'
import {
    AppBar//,
    // Paper
} from 'material-ui'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import AppNavDrawer from './AppNavDrawer'

const styles = {
    label:{
        color:'white'
    },
    paper:{
        margin:20,
        padding:20
    }
}
class Main extends React.Component {
    state = {
        open:true,
        margin:{
            marginLeft:256
        }
    }
    handleNavButtonTouch = ()=> {
        this.setState({
            open:!this.state.open,
            margin:{
                marginLeft:this.state.margin.marginLeft===0?256:0
            }
        })
    }
    render() {
        const {
            pathname,
            mobile,
            handleSelect,
            admin,
            doctor,
            doctorAssistant,
            logoutHandler
        } = this.props
        return (
            <div>
                <AppBar 
                    title = '管理后台'
                    onLeftIconButtonTouchTap = {this.handleNavButtonTouch}
                    iconElementRight={
                            <IconMenu
                                iconButtonElement={
                                <FlatButton labelStyle={styles.label} label={ mobile } />
                                }
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                                <MenuItem primaryText="安全退出" onClick={ logoutHandler }/>
                            </IconMenu>
                    }
                />
                <AppNavDrawer 
                    open = {this.state.open} 
                    pathname = { pathname }
                    handleSelect = { handleSelect }
                    admin = { admin }
                    doctor = { doctor }
                    doctorAssistant = { doctorAssistant }
                />
                <div style = { this.state.margin}>
                    <div style = { styles.paper } >
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

Main.propTypes = {
    children:React.PropTypes.node,
    mobile:React.PropTypes.string.isRequired,
    pathname:React.PropTypes.string.isRequired,
    handleSelect:React.PropTypes.func.isRequired,
    admin:React.PropTypes.bool.isRequired,
    doctor:React.PropTypes.bool.isRequired,
    doctorAssistant:React.PropTypes.bool.isRequired,
    logoutHandler:React.PropTypes.func.isRequired
}

export default Main