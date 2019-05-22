import React from 'react'
import { Link } from 'react-router-dom'

import { Block } from 'components'
import { SignUpForm } from 'containers'

const SignUpPage = (props) => {
  return (
    <div>
      <Block>
        <h1>Dutch Broomstick</h1>
        <SignUpForm />
      </Block>
      <Block>
        <p>계정이 있다면? <Link to="/">로그인</Link></p>
      </Block>
    </div>
  )
}

export default SignUpPage
