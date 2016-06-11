import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import {reducer as formReducer } from 'redux-form'
import auth from '../reducers/auth'
import {
  LOGOUT_SUCCESS
} from '../constants/ActionTypes'
import { reducer as toastrReducer } from 'react-redux-toastr'

export const makeRootReducer = (asyncReducers) => {
  const appReducer = combineReducers({
    // Add sync reducers here
    router,
    auth,
    toastr:toastrReducer,
    form:formReducer,
    ...asyncReducers
  })
  return (state,action)=>{
    //if user logout reset the state
    if(action.type === LOGOUT_SUCCESS){
      state = undefined
    }
    return appReducer(state,action)
  }
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
