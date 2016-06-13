import { connect } from 'react-redux'
import DetailView from 'pages/lesson/DetailView'
import { change } from 'redux-form'
import { editLesson } from 'actions/lesson'
import { uploadCover } from 'actions/upload'

const mapStateToProps = state => ({
	lesson : state.lesson.detail
})

const mapDispatchToProps = dispatch =>({
    editSubmitHandler: (close,values) => {
        let lesson = {
            cover: values.cover,
            lname: values.lname,
            lid: values.lid,
            file: values.file,
            descript: values.descript
        }
        if (lesson.file) {
            dispatch(uploadCover(lesson.file)).then(cover => {
                if (cover) {
                    delete lesson.file
                    lesson.cover = cover
                    dispatch(editLesson(lesson)).then(ok => {
                        if(ok) close()
                    })
                }
            })
        } else {
            delete lesson.file
            dispatch(editLesson(lesson)).then(ok => {
                if(ok) close()
            })
        }
    },
	onChange : file => {
		dispatch(change('editLesson','file',file))
	}
})

export default connect(mapStateToProps,mapDispatchToProps)( DetailView )