import {
    applyMiddleware,
    compose,
    createStore
} from 'redux'
import {
    routerMiddleware
} from 'react-router-redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import makeRootReducer from './reducers'

export default (initialState = {}, history) => {
    const middleware = [thunk, routerMiddleware(history)]
    const enhancers = []
    enhancers.push(persistState(null,'YMT_INITIAL_STATE'))
    const store = createStore(
        makeRootReducer(),
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    )
    store.asyncReducers = {}
    //// Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const reducers = require('./reducers').default
            store.replaceReducer(reducers)
        })
    }

    return store
}