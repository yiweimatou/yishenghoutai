import React from 'react'
import Drawer from 'material-ui/Drawer'
import {List, ListItem, MakeSelectable} from 'material-ui/List'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const SelectableList = MakeSelectable(List)
const styles = {
    containerStyle :{
        marginTop:getMuiTheme().appBar.height,
        zIndex:getMuiTheme().zIndex.appBar - 1
    },
    listStyle:{
        paddingTop:'0px'
    }
}

class AppNavDrawer extends React.Component{
	render(){
        const {
            open,handleSelect,pathname,admin,doctor,doctorAssistant
        } = this.props
		return (
			<Drawer
				open= {open}
				containerStyle = {styles.containerStyle}
			>
				<SelectableList
					value = { pathname }
					onChange = { handleSelect }
					style = { styles.listStyle }
				>
					<ListItem primaryText="后台主页" value="/" />
					{admin?(<ListItem primaryText = "我管理的机构" value = "/organize/list" />):null}
					{
						(admin || doctor) ?
						(<ListItem 
							primaryText="课程管理" 
							primaryTogglesNestedList = {true}
							nestedItems = {[
								<ListItem primaryText = "新增" value = "/lesson/add" />,
								<ListItem primaryText = "列表" value = "/lesson/list" />
							]}		
						/>):null
					}
					<ListItem 
						primaryText="云板书管理" 
						primaryTogglesNestedList = {true}
						nestedItems = {[
							<ListItem primaryText = "新增" value = "/yunbook/add" />,
							<ListItem primaryText = "列表" value = "/yunbook/list" />
						]}			
					/>
					<ListItem
						primaryText = '我的团队邀请'
						value = '/teaminvited/list' 
					/>
					<ListItem 
						primaryText="个人设置" 
						primaryTogglesNestedList = {true}
						nestedItems = {[
							<ListItem primaryText = "基本信息" value = "/setting/basic" />,
							<ListItem primaryText = "修改密码" value = "/setting/changepwd" />
						]}			
					/>
				</SelectableList>
			</Drawer>
			)
	}
}

AppNavDrawer.propTypes = {
    pathname :React.PropTypes.string.isRequired,
    handleSelect:React.PropTypes.func.isRequired,
    open:React.PropTypes.bool.isRequired,
    admin:React.PropTypes.bool.isRequired,
    doctor:React.PropTypes.bool.isRequired,
    doctorAssistant:React.PropTypes.bool.isRequired
}
export default AppNavDrawer