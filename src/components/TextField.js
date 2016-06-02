import {
    createElement
} from 'react'
import mapError from './mapError'
import {
    TextField
} from 'material-ui'

export default props=> createElement(TextField,mapError(props))