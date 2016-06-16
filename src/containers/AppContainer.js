import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
// import 'react-redux-toastr/src/less/index.less'

class AppContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render () {
    const { history, routes, store } = this.props

    return (
      <Provider store = { store }>
        <div style = { { height: '100%' } }>
          <Router 
            history = { history } 
            children = { routes }
            onUpdate = { () => window.scrollTo(0, 0) }
           />
           <ReduxToastr
            timeOut = { 3000 }
          /> 
        </div>
      </Provider>
    )
  }
}

export default AppContainer
