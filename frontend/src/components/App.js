import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { MainPage, UserPage, UserInfoPage, SignUpPage } from 'containers'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

injectGlobal`
  body {
    margin: 0;
  }
`

/**
 * https://reacttraining.com/react-router/web/api/Route
 */

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/signup/" component={SignUpPage} exact />
        <Route path="/user/:id/" component={UserPage} exact />
        <Route path="/user/:id/setting/" component={UserInfoPage} exact />
      </Switch>
    </ThemeProvider>
  )
}

export default App
