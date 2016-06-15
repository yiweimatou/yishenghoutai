import React from 'react'
import { Paper,RaisedButton,Dialog } from 'material-ui'
import EditView from './EditView'
import SelectListView from '../organize/SelectListView'
import Pager from '../../Pager'

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
        maxWidth :700
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
		applyOpen:false
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
			lesson,
			onChange,
			editSubmitHandler,
			goToAddSection,
			organizeList,
			offset,
			limit,
			total,
			onPageClick,
			onSearch,
			applyHandler
		} = this.props
		if( !lesson ){
			return (null)
		}
		return (
			<div>
				<Paper style = { styles.paper }>
					<img src = { lesson.cover } alt = 'cover' width='256' heigt='256' />
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
						<RaisedButton label ='邀请成员' primary = { true }/>
					</div>
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
				>
					<div style = {{width:'99%'}}>
						<SelectListView
							list = { organizeList }
							onSearch = { onSearch }
							applyHandler = { 
								oid => applyHandler(this.applyOpenHandler,oid,lesson.lid) }
						>
						</SelectListView>
						<Pager 
							offset = { offset }
							limit = { limit }
							onPageClick = { onPageClick }
							total = { total }
						/>
					</div>
				</Dialog>
			</div>
		)
	}
}

DetialView.propTypes = {
	lesson:React.PropTypes.object,
	onChange :  React.PropTypes.func.isRequired,
	editSubmitHandler : React.PropTypes.func.isRequired,
	goToAddSection : React.PropTypes.func.isRequired,
	organizeList:React.PropTypes.array,
	offset: React.PropTypes.number.isRequired,
    total: React.PropTypes.number.isRequired, 
    limit: React.PropTypes.number.isRequired, 
    onPageClick: React.PropTypes.func.isRequired,
	onSearch : React.PropTypes.func.isRequired,
	applyHandler:React.PropTypes.func.isRequired
}

export default DetialView