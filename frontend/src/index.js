// https://github.com/diegohaz/arc/wiki/Example-app
import 'react-hot-loader/patch'
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
//import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'


import { basename } from 'config'
import configureStore, { history } from 'store/configure'
import api from 'services/api'
import App from 'components/App'

const store = configureStore({}, { api: api.create() })

const renderApp = () => (
  <Provider store={store}>
    <div>
      <ConnectedRouter basename={basename} history={history}>
        <App />
      </ConnectedRouter>
      <ReduxToastr
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar />
    </div>
  </Provider>
)

const root = document.getElementById('app')
render(renderApp(), root)

if (module.hot) {
  module.hot.accept('components/App', () => {
    require('components/App')
    render(renderApp(), root)
  })
}
