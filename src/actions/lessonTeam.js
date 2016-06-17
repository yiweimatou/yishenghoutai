import fetch from 'isomorphic-fetch'
import {
    TEAM_ADD_API,
    TEAM_LIST_API,
    TEAM_REMOVE_API,
    TEAM_EDIT_API,
    OK
} from '../constants/api'
import {
    GET_LESSONTEAM_LIST_REQUEST,
    GET_LESSONTEAM_LIST_SUCCESS,
    GET_LESSONTEAM_LIST_FAILURE,
    REMOVE_LESSONTEAM_SUCCESS,
    EDIT_LESSONTEAM_SUCCESS,
    GET_LESSONTEAM_INVITED_LIST_SUCCESS
} from '../constants/ActionTypes'
import {
    toastr
} from 'react-redux-toastr'

const getLessonTeamInvitedListSuccess = list => ({
    type: GET_LESSONTEAM_INVITED_LIST_SUCCESS,
    list
})

export const getLessonTeamInvitedList = () => {
    return (dispatch, getState) => {
        const user = getState().auth.user
        return fetch(`${TEAM_LIST_API}?uid=${user.id}&cet=1&common=1`).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => {
            if (data.code === OK) {
                if (data.list.length > 0) {
                    dispatch(getLessonTeamInvitedListSuccess(data.list))
                }
            } else {
                throw new Error(data.msg)
            }
        }).catch(error => {
            toastr.error(error.message)
        })
    }
}

const removeLessonTeamSuccess = id => ({
    type: REMOVE_LESSONTEAM_SUCCESS,
    id
})

const editLessonTeamSuccess = (id) => ({
    type: EDIT_LESSONTEAM_SUCCESS,
    id
})

export const editLessonTeam = (id, cet) => {
    return (dispatch, getState) => {
        const user = getState().auth.user
        return fetch(TEAM_EDIT_API, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `key=${user.id}&token=${user.token}&id=${id}&cet=${cet}`
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => {
            if (data.code === OK) {
                dispatch(editLessonTeamSuccess(id))
                toastr.success('操作成功')
            } else {
                throw new Error(data.msg)
            }
        }).catch(error => {
            toastr.error(error.message)
        })
    }
}

export const removeLessonTeam = id => {
    return (dispatch, getState) => {
        const user = getState().auth.user
        return fetch(TEAM_REMOVE_API, {
            method: 'DELETE',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body: `key=${user.id}&token=${user.token}&id=${id}`
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => {
            if (data.code === OK) {
                dispatch(removeLessonTeamSuccess(id))
                toastr.success('移除成功!')
            } else {
                throw new Error(data.msg)
            }
        }).catch(error => {
            toastr.error(error.message)
        })
    }
}
const getLessonTeamListRequest = () => ({
    type: GET_LESSONTEAM_LIST_REQUEST
})

const getLessonTeamListSuccess = list => ({
    type: GET_LESSONTEAM_LIST_SUCCESS,
    list
})

const getLessonTeamListFailure = () => ({
    type: GET_LESSONTEAM_LIST_FAILURE
})

export const getLessonTeamList = (lid) => {
    return dispatch => {
        dispatch(getLessonTeamListRequest())
        return fetch(`${TEAM_LIST_API}?lid=${lid}&cet=4`).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => {
            if (data.code === OK) {
                dispatch(getLessonTeamListSuccess(data.list))
            } else {
                throw new Error(data.msg)
            }
        }).then(() => {
            dispatch(getLessonTeamListFailure())
        })
    }
}

export const addLessonTeam = (lid, mobile) => {
    return (dispatch, getState) => {
        const user = getState().auth.user
        return fetch(TEAM_ADD_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `key=${user.id}&token=${user.token}&mobile=${mobile}&lid=${lid}`
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText)
            }
        }).then(data => {
            if (data.code === OK) {
                toastr.success('邀请成功!')
                return true
            } else {
                throw new Error(data.msg)
            }
        }).catch(error => {
            toastr.error(error.message)
        })
    }
}