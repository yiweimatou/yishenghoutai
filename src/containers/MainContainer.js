import Main from '../components/Main'
import {
    connect
} from 'react-redux'
import {
    push
} from 'react-router-redux'
import { logout } from 'actions/auth'

const mapStateToProps = state => {
    return {
        mobile : state.auth.user.mobile,
        pathname : state.router.locationBeforeTransitions.pathname,
        admin : state.auth.admin,
        doctor : state.auth.doctor,
        doctorAssistant : state.auth.doctorAssistant
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleSelect:(e,value) => {
            dispatch(push(value))
        },
        logoutHandler:()=>{
            dispatch( logout() ).then(()=>{
                dispatch(push('/login'))  
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main)