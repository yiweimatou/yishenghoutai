import LoginRoute from './login'
import home from './home'
import App from '../components/App'
import {
    AUTHENTICATED
} from '../constants/actiontypes/auth'
import {
    replace
} from 'react-router-redux'

const routes = store => ({
    component: App,
    childRoutes: [
        LoginRoute, {
            path: '/',
            indexRoute: {
                component: require('../components/pages/Home').default
            },
            onEnter(nextState) {
                if (store.getState().auth.status !== AUTHENTICATED) {
                    store.dispatch(replace({
                        pathname: '/login',
                        state: {
                            nextPathname: nextState.location.pathname
                        }
                    }))
                }
            },
            childRoutes: [
                home
            ]
        }
    ]
})

export default routes