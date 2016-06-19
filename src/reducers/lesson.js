import { 
	LESSON_ADD_REQUEST,
	LESSON_ADD_SUCCESS,
	LESSON_ADD_FAILURE,
	LESSON_EDIT_REQUEST,
	LESSON_EDIT_SUCCESS,
	LESSON_EDIT_FAILURE,
	LESSON_INFO_REQUEST,
	LESSON_INFO_SUCCESS,
	LESSON_INFO_FAILURE,
	LESSON_LIST_REQUEST,
	LESSON_LIST_SUCCESS,
	LESSON_LIST_FAILURE,
	LESSON_GET_REQUEST,
	LESSON_GET_SUCCESS,
	LESSON_GET_FAILURE
 } from 'constants/ActionTypes'


 const initialState = {
     list: [],
     loading: false,
     method: '',
     errorMessage: '',
     detail: null
 }

 const ACTION_HANDLERS = {
     [LESSON_GET_REQUEST]: state => ({
             ...state,
         loading: true,
         method: 'GET'
     }),
     [LESSON_GET_SUCCESS]: (state, action) => ({
             ...state,
         loading: false,
         method: '',
         detail: Object.assign({},action.lesson)
     }),
     [LESSON_GET_FAILURE]: (state, action) => ({
             ...state,
         loading: false,
         method: '',
         errorMessage: action.errorMessage
     }),
     [LESSON_ADD_REQUEST]: state => ({
             ...state,
         loading: true,
         method: 'add'
     }),
     [LESSON_ADD_SUCCESS]: state => ({
             ...state,
         loading: false,
         method: ''
     }),
     [LESSON_ADD_FAILURE]: (state, action) => ({
             ...state,
         loading: false,
         method: '',
         errorMessage: action.errorMessage
     }),
     [LESSON_EDIT_REQUEST]: state => ({
             ...state,
         loading: true,
         method: 'edit'
     }),
     [LESSON_EDIT_FAILURE]: (state, action) => ({
             ...state,
         loading: false,
         method: '',
         errorMessage: action.errorMessage
     }),
     [LESSON_EDIT_SUCCESS]: (state,action) => ({
             ...state,
         loading: false,
         method: '',
         detail : Object.assign({},state.detail,action.args)
     }),
     [LESSON_LIST_REQUEST]: state => ({
             ...state,
         loading: true,
         method: 'list'
     }),
     [LESSON_LIST_SUCCESS]: (state, action) => ({
             ...state,
         loading: false,
         method: '',
         list: state.list.concat(action.lessons)
     }),
     [LESSON_LIST_FAILURE]: (state, action) => ({
             ...state,
         loading: false,
         method: '',
         errorMessage: action.errorMessage
     })
 }

 const lesson = (state = initialState, action) => {
     const handler = ACTION_HANDLERS[action.type]
     return handler ? handler(state, action) : state
 }

 export default lesson