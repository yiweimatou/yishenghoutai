import LoginRoute from './login'
import home from './home'
import App from '../components/App'
import {
    AUTHENTICATED
} from '../constants/ActionTypes'
import MainContainer from '../containers/MainContainer'
import organize from './organize'

const routes = store => ({
    component: App,
    childRoutes: [
        LoginRoute, {
            path: '/',
            component: MainContainer,
            indexRoute: {
                component: require('../components/pages/Home').default
            },
            onEnter(nextState,replace) {
                if (store.getState().auth.status !== AUTHENTICATED) {
                    replace({
                        pathname: '/login',
                        state: {
                            nextPathname: nextState.location.pathname
                        }
                    })
                }
            },
            childRoutes: [
                home, 
                organize( store ),
                {
                    path: '*',
                    component: require('../components/pages/PageNotFound').default
                }
            ]
        }
    ]
})

export default routes