import React from 'react'
import { Link } from 'react-router-dom'

import { SignUpForm } from 'containers'

const SignUpPage = (props) => {
  return (
    <div>
      <h1>더치 빗자루</h1>
      <SignUpForm />
      <Link to="/"><button>로그인</button></Link>
    </div>
  )
}

export default SignUpPage
