//components/pages/UserInfoPage/index.js

import React from 'react'
import { UserInfoForm } from 'containers'
import { Block, Header } from 'components'

const UserInfoPage = (props) => {
  return (
      <div>
        <Header />
        <Block>
          <h1>개인정보 변경</h1>
          <UserInfoForm />
        </Block>
      </div>
  )
}


export default UserInfoPage