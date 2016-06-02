import {
    compose,
    applyMiddleware,
    createStore
} from 'redux'
import {
    routerMiddleware
} from 'react-router-redux'
import thunk from 'redux-thunk'
// import persistState from 'redux-localstorage'
// import adapter from 'redux-localstorage/lib/adapters/localStorage'
// import logger from 'redux-logger'
import makeRootReducer from './reducers'

export default (initialState = {}, history) => {
    const middleware = [thunk, routerMiddleware(history)]
    const enhancers = []
    // enhancers.push(persistState(adapter(window.localStorage), 'YMT_INITIAL_STATE'))
    if (__DEV__) {
        // middleware.push(logger())
        const devToolsExtension = window.devToolsExtension
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension())
        }
    }
    const store = createStore(
        makeRootReducer(),
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers)
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