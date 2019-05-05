//components/pages/UserInfoPage/index.js

import React from 'react'
import { UserInfoForm } from 'containers'


const UserInfoPage = (props) => {
  return (
      <div>
          <h1>개인정보 변경</h1>
          <UserInfoForm />
      </div>
  )
}


export default UserInfoPage