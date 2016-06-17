import React from 'react'
import { Paper,RaisedButton,Dialog,FloatingActionButton,Divider } from 'material-ui'
import { ContentRemove } from 'material-ui/svg-icons'
import EditView from './EditView'
import SelectListView from '../organize/SelectListView'
import SelectView from '../user/SelectView'
import UserView from '../../UserView'
import OrganizeView from '../../OrganizeView'
import SectionView from '../../SectionView'
import Pager from '../../Pager'

const styles = {
    paper:{
        display:'flex',
        justifyContent :'space-around'
    },
	team:{
		marginTop:30,
		padding:30
	},
	flex:{
		display:'flex',
		marginTop:10
	},
	teamManage:{
		display:'flex',
		justifyContent:'space-between'
	},
    div:{ 	
        display:'flex',
        flexFlow:'row nowrap',
        justifyContent :'space-around',
		width :550
    },
    dl:{
        marginLeft:50
    },
    dt:{
        float: 'left',
        width: 80,
        overflow: 'hidden',
        clear: 'left',
        textAlign: 'right',
        whiteSpace: 'nowrap',
        fontWeight: 'bold',
        lineHeight: 1.42857143
    },
    dd:{
        marginLeft: 100,
        lineHeight: 1.42857143
    }
}
class DetialView extends React.Component {
	state = {
		editOpen:false,
		applyOpen:false,
		inviteOpen:false,
		teamManageOpen:false
	}
	teamManageOpenHandler = () => {
		this.setState({
			teamManageOpen:!this.state.teamManageOpen
		})
	}
	inviteOpenHandler = () =>{
		this.setState({
			inviteOpen:!this.state.inviteOpen
		})
	}
	editOpenHandler = () => {
		this.setState({
			editOpen:!this.state.editOpen
		})
	}
	applyOpenHandler = () => {
		this.setState({
			applyOpen:!this.state.applyOpen
		})
	}
	render () {
		const {
			section,
			lesson,
			onChange,
			editSubmitHandler,
			goToAddSection,
			organizeList,
			offset,
			limit,
			total,
			user,
			onPageClick,
			onSearch,
			applyHandler,
			userSearchHandler,
			inviteHandler,
			teamUsers,
			removeTeamUser,
			organizes,
			sectionPagerHandler
		} = this.props
		if( !lesson ){
			return (null)
		}
		return (
			<div>
				<Paper style = { styles.paper }>
					<img src = { lesson.cover } alt = 'cover' width='256' heigt='256' />
					<div>
						<dl>
							<dt style = {styles.dt}>课程名</dt>
							<dd style = {styles.dd}>{lesson.lname}</dd>
							<dt style = {styles.dt}>课程简介</dt>
							<dd style = {styles.dd}>{lesson.descript}</dd>
							<dt style = {styles.dt}>创建时间</dt>
							<dd style = {styles.dd}>{ new Date(lesson.add_ms*1000).toLocaleString()}</dd>
							<dt style = {styles.dt}>更新时间</dt>
							<dd style = {styles.dd}>{new Date(lesson.put_ms*1000).toLocaleString()}</dd>
							<dt style = {styles.dt}>浏览量</dt>
							<dd style = {styles.dd}>{lesson.view_num}</dd>
							<dt style = {styles.dt}>关注量</dt>
							<dd style = {styles.dd}>{lesson.focus_num}</dd>
						</dl>
						<div style = { styles.div }>
							<RaisedButton 
								label ='编辑' 
								primary = { true }
								onClick = { this.editOpenHandler }
							/>
							<RaisedButton 
								label ='新建文章' 
								primary = { true }
								onClick = { ()=>goToAddSection(lesson.lid) }
							/>
							<RaisedButton 
								label ='申请机构认证' 
								primary = { true }
								onClick = { this.applyOpenHandler }
							/>
							<RaisedButton 
								label ='邀请成员' 
								primary = { true }
								onClick = { this.inviteOpenHandler }
							/>
							<RaisedButton 
								label ='团队管理' 
								primary = { true }
								onClick = { this.teamManageOpenHandler }
							/>
						</div>
					</div>
				</Paper>
				<Paper style = { styles.team } >
					<h2>课程团队</h2>
					<Divider />
					<div style = { styles.flex }>
					{
						teamUsers.map(user=>{
							return <UserView key={user.id} user={user} />
						})
					}
					</div>
				</Paper>
				<Paper style = { styles.team }>
					<h2>认证过的机构</h2>
					<Divider />
					<div style = { styles.flex }>
					{
						organizes.map(organize=>{
							return <OrganizeView key ={organize.id} organize={organize}/>
						})
					}
					</div>
				</Paper>
				<Paper style = { styles.team }>
					<h2>文章列表</h2>
					<Divider />
					<div style = { styles.flex }>
					{
						section.list.map( section=><SectionView section={section} key={section.sid}/>)
					}
					</div>
					<Pager 
						limit={section.limit} 
						offset={section.offset} 
						total = {section.total}
						onPageClick={ ()=>sectionPagerHandler(offset,limit,lesson.lid) }
					/>
				</Paper>
				<Dialog 
					title = '编辑'
					open = { this.state.editOpen }
					autoScrollBodyContent={true}
					onRequestClose = { this.editOpenHandler }
				>
					<EditView 
						initialValues = { lesson } 
						onChange = { onChange }
						imageUrl = { lesson.cover }
						onSubmit = { editSubmitHandler.bind(null,this.editOpenHandler) }
					/>
				</Dialog>
				<Dialog 
					title = '申请认证'
					open = { this.state.applyOpen }
					onRequestClose = { this.applyOpenHandler }
					autoScrollBodyContent={true}
				>
					<div style = {{width:'99%'}}>
						<SelectListView
							offset = { offset }
							limit = { limit }
							onPageClick = { onPageClick }
							total = { total }
							list = { organizeList }
							onSearch = { onSearch }
							applyHandler = { 
								oid => applyHandler(this.applyOpenHandler,oid,lesson.lid) }
						/>
					</div>
				</Dialog>
				<Dialog
					title = '邀请加入团队'
					open = { this.state.inviteOpen }
					onRequestClose = { this.inviteOpenHandler }
					autoScrollBodyContent={true}
				>
					<SelectView
						userSearchHandler = { userSearchHandler }
						user = { user }
						inviteHandler = {
							(uid) => inviteHandler(this.inviteOpenHandler,lesson.lid,uid)
						}
					/>
				</Dialog>
				<Dialog
					title = '团队管理'
					open = { this.state.teamManageOpen }
					onRequestClose = { this.teamManageOpenHandler }
				>
					{
						teamUsers.map(user => {
							return(
								<div key={user.id} style ={ styles.teamManage }>
									<UserView user={user} />
									{user.admin === 1 ? null:
									<div>
										<FloatingActionButton
											secondary = { true }
											onClick = { ()=>removeTeamUser(user.id) }
										>
											<ContentRemove />
										</FloatingActionButton>
									</div>}
								</div>
							)
						})
					}
				</Dialog>
			</div>
		)
	}
}

DetialView.propTypes = {
	lesson:React.PropTypes.object,
	user:React.PropTypes.object,
	onChange :  React.PropTypes.func.isRequired,
	editSubmitHandler : React.PropTypes.func.isRequired,
	goToAddSection : React.PropTypes.func.isRequired,
	organizeList:React.PropTypes.array,
	offset: React.PropTypes.number.isRequired,
    total: React.PropTypes.number.isRequired, 
    limit: React.PropTypes.number.isRequired, 
    onPageClick: React.PropTypes.func.isRequired,
	onSearch : React.PropTypes.func.isRequired,
	applyHandler:React.PropTypes.func.isRequired,
	userSearchHandler:React.PropTypes.func.isRequired,
	inviteHandler:React.PropTypes.func.isRequired,
	teamUsers:React.PropTypes.array,
	removeTeamUser:React.PropTypes.func.isRequired,
	organizes:React.PropTypes.array,
	section:React.PropTypes.object,
	sectionPagerHandler:React.PropTypes.func.isRequired
}

export default DetialView