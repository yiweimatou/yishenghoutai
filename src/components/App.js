import React from 'react'
import {
    getMuiTheme,
    MuiThemeProvider
} from 'material-ui/styles'
import 'react-redux-toastr/src/less/index.less'

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme = { getMuiTheme() } >
                {this.props.children}
            </MuiThemeProvider>
        )
    }
}
App.propTypes = {
    children : React.PropTypes.node
}

export default App