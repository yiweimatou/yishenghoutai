import React from 'react'
import { Paper,RaisedButton,Dialog,FlatButton } from 'material-ui'
import EditView from './EditView'

const styles = {
    paper:{
        display:'flex',
        flexFlow:'row nowrap',
        justifyContent :'space-around'
    },
    div:{ 	
        display:'flex',
        flexFlow:'row nowrap',
        justifyContent :'space-around',
        maxWidth :500
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
		editOpen:false
	}
	editOpenHander = () => {
		this.setState({
			editOpen:!this.state.editOpen
		})
	}
	render () {
		const {
			lesson,onChange,editSubmitHandler
		} = this.props
		if( !lesson ){
			return (null)
		}
		const editActions = [
			<FlatButton 
				label="Cancel"
				primary={true}
				onTouchTap={this.editOpenHander}
			/>,
			<FlatButton 
				label="Submit" 
				primary={true} 
				keyboardFocused={true} 
				onTouchTap={this.editOpenHander} 
			/>
		]
		return (
			<div>
				<Paper style = { styles.paper }>
					<img src = { lesson.cover } alt = 'cover' width='512' heigt='512' />
					<div>
						<dl>
							<dt style = {styles.dt}>课程名</dt>
							<dd style = {styles.dd}>{lesson.lname}</dd>
							<dt style = {styles.dt}>课程简介</dt>
							<dd style = {styles.dd}>{lesson.descript}</dd>
							<dt style = {styles.dt}>创建时间</dt>
							<dd style = {styles.dd}>{ new Date(lesson.add_ms*1000).toString()}</dd>
							<dt style = {styles.dt}>更新时间</dt>
							<dd style = {styles.dd}>{new Date(lesson.put_ms*1000).toString()}</dd>
							<dt style = {styles.dt}>浏览量</dt>
							<dd style = {styles.dd}>{lesson.view_num}</dd>
							<dt style = {styles.dt}>关注量</dt>
							<dd style = {styles.dd}>{lesson.focus_num}</dd>
						</dl>
						<div style = { styles.div }>
							<RaisedButton 
								label ='编辑' 
								primary = { true }
								onClick = { this.editOpenHander }
							/>
							<RaisedButton label ='新建文章' primary = { true }/>
							<RaisedButton label ='申请机构认证' primary = { true }/>
							<RaisedButton label ='邀请成员' primary = { true }/>
						</div>
					</div>
				</Paper>
				<Dialog 
					title = '编辑'
					modal = { false }
					open = { this.state.editOpen }
					autoScrollBodyContent={true}
					onRequestClose = { this.editOpenHander }
				>
					<EditView 
						initialValues = { lesson } 
						onChange = { onChange }
						imageUrl = { lesson.cover }
						onSubmit = { editSubmitHandler.bind(null,this.editOpenHander) }
					/>
				</Dialog>
			</div>
		)
	}
}

DetialView.propTypes = {
	lesson:React.PropTypes.object,
	onChange :  React.PropTypes.func.isRequired,
	editSubmitHandler : React.PropTypes.func.isRequired
}

export default DetialView