import { connect } from 'react-redux'
import DetailView from 'pages/lesson/DetailView'
import { change } from 'redux-form'
import { editLesson } from 'actions/lesson'
import { uploadCover } from 'actions/upload'
import { push } from 'react-router-redux'
import { getOrganizeInfo, fetchList } from 'actions/organize'
import { addOrganizeLesson } from 'actions/organizeLesson'
import { getUser } from 'actions/user'
import { addLessonTeam,removeLessonTeam } from 'actions/lessonTeam'

const mapStateToProps = state => ({
	lesson : state.lesson.detail,
    total:state.organize.total,
    limit:state.organize.limit,
    offset:state.organize.offset,
    organizeList:state.organize.list,
    user:state.user.detail,
    teamUsers:state.lessonTeam.list
})

const mapDispatchToProps = dispatch =>({
    removeTeamUser:id => {
        dispatch( removeLessonTeam(id) )
    },
    onPageClick:(oname,offset,limit) => {
        dispatch( fetchList({
            limit,offset,oname
        }))
    },
    applyHandler: (close,oid,lid) => {
        Promise.resolve( dispatch( addOrganizeLesson(oid,lid)) ).then( ok=>{
            if(ok){
                close()
            }
        })
    },
    onSearch : ( title ) => {
        dispatch( getOrganizeInfo({
            limit:4,
            offset:1,
            oname:title
        }))
        dispatch( fetchList({
            limit:4,
            offset:1,
            oname:title
        }))
    },
    inviteHandler : (close,lid,mobile) => {
        Promise.resolve(dispatch( addLessonTeam(lid,mobile) )).then(ok=>{
            if( ok ){
                close()
            }
        })
    },
    userSearchHandler:mobile => {
        dispatch( getUser(mobile) )
    },
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
	},
    goToAddSection : lid => {
        dispatch(push(`/section/add/${lid}`))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)( DetailView )