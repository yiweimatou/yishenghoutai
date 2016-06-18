import {
    connect
} from 'react-redux'
import DetailView from 'pages/lesson/DetailView'
import {
    change,
    initialize
} from 'redux-form'
import {
    editLesson
} from 'actions/lesson'
import {
    uploadCover
} from 'actions/upload'
import {
    push
} from 'react-router-redux'
import {
    getOrganizeInfo,
    fetchList
} from 'actions/organize'
import {
    addOrganizeLesson
} from 'actions/organizeLesson'
import {
    getUser
} from 'actions/user'
import {
    addLessonTeam,
    removeLessonTeam
} from 'actions/lessonTeam'
import {
    getSectionList,
    editSection,
    getSection,
    deleteSection
} from 'actions/section'
import {
    toastr
} from 'react-redux-toastr'
import {
    listAreaIfNeeded,
    setSelectedAreaSuccess,
    getArea
} from 'actions/area'

const mapStateToProps = state => ({
    areas4: state.area[4],
    areas5: state.area[5],
    areas6: state.area[6],
    areas7: state.area[7],
    select:state.area.select,
    lesson: state.lesson.detail,
    total: state.organize.total,
    limit: state.organize.limit,
    offset: state.organize.offset,
    organizeList: state.organize.list,
    organizes: state.organizeLesson.plist,
    user: state.user.detail,
    teamUsers: state.lessonTeam.list,
    section: {
        list: state.section.list,
        limit: state.section.limit,
        offset: state.section.offset,
        total: state.section.total
    },
    admin: !!state.lesson.detail && state.lesson.detail.uid === state.auth.user.id
})

const mapDispatchToProps = dispatch => ({
    initialEditView: (aid, sid) => {
        getArea({
                aid: aid
            })
            .then(area => {
                dispatch(listAreaIfNeeded({
                        pid: area.aid,
                        zoom: 7
                    }))
                    //set zoom 6 select
                dispatch(setSelectedAreaSuccess(area.aid, area.zoom))
                return getArea({
                    aid: area.pid
                })
            }).then(area => {
                dispatch(listAreaIfNeeded({
                        pid: area.aid,
                        zoom: 6
                    }))
                    //set zoom 5 select
                dispatch(setSelectedAreaSuccess(area.aid, area.zoom))
                return getArea({
                    aid: area.pid
                })
            }).then(area => {
                dispatch(listAreaIfNeeded({
                        pid: area.aid,
                        zoom: 5
                    }))
                    //set zoom 4 select
                dispatch(setSelectedAreaSuccess(area.aid, area.zoom))
            })
        getSection({
            sid
        }).then(section => {
            if (section && section.sname) {
                dispatch(initialize('editSection', {
                    sname: section.sname,
                    sid: section.sid,
                    aid: section.aid,
                    status: section.status,
                    descript: section.descript
                }))
            } else {
                toastr.error(section.msg)
            }
        })

    },
    deleteHandler: id => {
        dispatch(deleteSection(id))
    },
    editHandler: (close,values) => {
        dispatch(editSection(values)).then( ok=>{
            if(ok){
                close()
            }
        })
    },
    sectionPagerHandler: (lid, offset, limit) => {
        dispatch(getSectionList({
            lid,
            offset,
            limit
        }))
    },
    removeTeamUser: id => {
        dispatch(removeLessonTeam(id))
    },
    onPageClick: (oname, offset, limit) => {
        dispatch(fetchList({
            limit,
            offset,
            oname
        }))
    },
    applyHandler: (close, oid, lid) => {
        Promise.resolve(dispatch(addOrganizeLesson(oid, lid))).then(ok => {
            if (ok) {
                close()
            }
        })
    },
    onSearch: (title) => {
        dispatch(getOrganizeInfo({
            limit: 4,
            offset: 1,
            oname: title
        }))
        dispatch(fetchList({
            limit: 4,
            offset: 1,
            oname: title
        }))
    },
    inviteHandler: (close, lid, mobile) => {
        Promise.resolve(dispatch(addLessonTeam(lid, mobile))).then(ok => {
            if (ok) {
                close()
            }
        })
    },
    userSearchHandler: mobile => {
        dispatch(getUser(mobile))
    },
    editSubmitHandler: (close, values) => {
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
                        if (ok) close()
                    })
                }
            })
        } else {
            delete lesson.file
            dispatch(editLesson(lesson)).then(ok => {
                if (ok) close()
            })
        }
    },
    onChange: file => {
        dispatch(change('editLesson', 'file', file))
    },
    goToAddSection: lid => {
        dispatch(push(`/section/add/${lid}`))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailView)