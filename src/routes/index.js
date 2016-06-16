import LoginRoute from './login'
import home from './home'
import App from '../components/App'
import {
    AUTHENTICATED
} from '../constants/ActionTypes'
import MainContainer from '../containers/MainContainer'
import organizeRoute from './organize'
import lessonRoute from './lesson'
import yunbookRoute from './yunbook'
import sectionRoute from './section'
import teamRoute from './lessonTeam'

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
                organizeRoute( store ),
                lessonRoute( store ),
                yunbookRoute( store ),
                sectionRoute( store ),
                teamRoute ( store ),
                {
                    path: '*',
                    component: require('../components/pages/PageNotFound').default
                }
            ]
        }
    ]
})

export default routes