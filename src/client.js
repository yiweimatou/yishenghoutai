import React from 'react'
import {
    render
} from 'react-dom'
import {
    browserHistory
} from 'react-router'
import {
    syncHistoryWithStore
} from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import createStore from './store'
import AppContainer from './containers/AppContainer'

injectTapEventPlugin()

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initailState = localStorage['__INITIAL_STATE__'] === undefined ?
    undefined : JSON.parse(localStorage['__INITIAL_STATE__'])
const store = createStore(initailState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => state.router
})
const routes = require('./routes').default(store)
render( 
    <AppContainer history = { history }
    routes = { routes }
    store = { store }
    />,
    document.getElementById('root')
)