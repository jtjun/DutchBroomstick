import React from 'react'
import { Field } from 'redux-form'

const SignUpForm = (props) => {

  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text" placeholder="Username" component="input" />
      <Field name="password" type="password" placeholder="Password" component="input" />
      <Field name="passwordRepeat" type="password" placeholder="PasswordRepeat" component="input" />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignUpForm
