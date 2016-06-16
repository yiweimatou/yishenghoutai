import { connect } from 'react-redux'
import ListView from 'pages/organize/ListView'
import { push } from 'react-router-redux'

const mapStateToProps = state => ({
	list : state.organize.myList
})

const mapDispatchToProps = dispatch => ({
	editHandler : function ( oid ) {
		dispatch(push(`/organize/edit/${oid}`))
	},
	goToDetail: oid => {
		dispatch(push(`/organize/detail/${oid}`))
	}
})

export default connect( mapStateToProps, mapDispatchToProps )(ListView)