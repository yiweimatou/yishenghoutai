import { connect } from 'react-redux'
import ListView from 'pages/organize/ListView'
import { push } from 'react-router-redux'

function mapStateToProps( state ) {
	return {
		list : state.organize.myList
	}
}

function mapDispatchToProps( dispatch ) {
	return {
		editHandler : function ( oid ) {
			dispatch(push(`/organize/edit/${oid}`))
		},
		goToDetail: oid => {
			dispatch(push(`/organize/detail/${oid}`))
		}
	}
}

export default connect( mapStateToProps, mapDispatchToProps )(ListView)