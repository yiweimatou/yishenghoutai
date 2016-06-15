import { connect } from 'react-redux'
import DetailView from 'pages/organize/DetailView'

const mapStateToProps = state => ({
    organize:state.organize.detail
})

export default connect( mapStateToProps )( DetailView )