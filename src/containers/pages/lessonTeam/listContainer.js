import { connect } from 'react-redux'
import ListView from 'pages/lessonTeam/ListView'
import { editLessonTeam } from 'actions/lessonTeam'

const mapStateToProps = state => ({
    list:state.lessonTeam.invitedList
})

const mapDispatchToProps = dispatch => ({
    editHandler: (id,cet) => {
        dispatch( editLessonTeam(id,cet) )
    }
})

export default connect( mapStateToProps,mapDispatchToProps )( ListView )