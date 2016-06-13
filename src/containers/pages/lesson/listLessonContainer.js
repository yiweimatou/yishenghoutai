import { connect } from 'react-redux'
import ListView from 'pages/lesson/ListView'
import { push } from 'react-router-redux'

const mapStateToProps = state => ({
    list: state.lesson.list
})

const mapDispatchToProps = dispatch => ({
    onClick: lid => {
        dispatch(push(`/lesson/detail/${lid}`))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ListView)