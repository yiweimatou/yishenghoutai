import { connect } from 'react-redux'
import ShowView from 'pages/yunbook/ShowView'

const mapStateToProps = state =>({
    yunbook:state.yunbook.detail
})

export default connect( mapStateToProps )(ShowView)