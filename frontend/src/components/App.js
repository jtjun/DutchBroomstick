import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { MainPage, UserPage, UserInfoPage, SignUpPage, RoomCreatePage, EntrancePage, RoomPage, RoomSettingPage, PaymentListPage, IndividualPage, AccountPage } from 'containers'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

injectGlobal`
  body {
    margin: 75px 0 0;
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
        <Route path="/room/:room_id/" component={RoomPage} exact />
        <Route path="/signup/" component={SignUpPage} exact />
        <Route path="/user/" component={UserPage} exact />
        <Route path="/user/setting/" component={UserInfoPage} exact  />
        <Route path="/user/create_room/" component={RoomCreatePage} exact  />
        <Route path="/user/:room_id/entrance/" component={EntrancePage} />
        <Route path="/room/:room_id/setting/" component={RoomSettingPage} />
        <Route path="/room/:room_id/payment_list/" component={PaymentListPage} />
        <Route path="/room/:room_id/member/:member/" component={IndividualPage} exact />
        <Route path="/room/:room_id/member/:member/:to" component={AccountPage} />
        
      </Switch>
    </ThemeProvider>
  )
}

export default App
