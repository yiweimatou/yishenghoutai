const LoginRoute = ({
    path: '/login',
    getComponent (nextState, cb) {
        require.ensure([], require => {
            const Login = require('../containers/loginContainer').default
            cb(null, Login)
        }, 'login')
    }
})

export default LoginRoute