import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { MainPage, UserPage, UserInfoPage, SignUpPage, RoomCreatePage, EntrancePage } from 'containers'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

injectGlobal`
  body {
    margin: 50px 0 0;
    background-color: #f6f6f6;
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
        <Route path="/user/:id/" component={UserPage} />
        <Route path="/user/:id/setting/" component={UserInfoPage} />
        <Route path="/user/create_room/" component={RoomCreatePage} />
        <Route path="/user/:room/entrance" component={EntrancePage} />
      </Switch>
    </ThemeProvider>
  )
}

export default App
