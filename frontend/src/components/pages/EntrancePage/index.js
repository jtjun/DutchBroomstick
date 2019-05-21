import React from 'react'
import { EntranceForm, LoginForm } from 'containers'
import { Link } from 'react-router-dom'


const EntrancePage = (props) => {
  return (
      <div>
        <LoginForm />
        <Link to="/signup"><button>회원가입</button></Link>
        <EntranceForm />
      </div>
  )
}

export default EntrancePage