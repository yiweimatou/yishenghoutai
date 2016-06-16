import { connect } from 'react-redux'
import DetailView from 'pages/organize/DetailView'
import { editOrganizeLesson } from 'actions/organizeLesson'
import { toastr } from 'react-redux-toastr'

const mapStateToProps = state => ({
    organize:state.organize.detail,
    list : state.organizeLesson.list,
    slist : state.organizeLesson.slist
})

const mapDispatchToProps = dispatch => ({
    editHandler : (id,cet) => {
        if( id === -1 ){
            return toastr.info('请先选择一项进行操作')
        }
        dispatch( editOrganizeLesson({
            id,cet
        }))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)( DetailView )