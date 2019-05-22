import React from 'react'
import { EntranceForm, LoginForm } from 'containers'
import { Link } from 'react-router-dom'

import { Button, Block } from 'components'

const EntrancePage = (props) => {
  return (
      <div>
        <Block>
          <h1>Login</h1>
          <LoginForm />
          <Link to="/signup"><Button>회원가입</Button></Link>
        </Block>
        <Block>
          <h1>룸 입장</h1>
          <EntranceForm />
        </Block>
      </div>
  )
}

export default EntrancePage