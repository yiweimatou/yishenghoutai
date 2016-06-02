import React from 'react'
import {
    getMuiTheme,
    MuiThemeProvider
} from 'material-ui/styles'

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