import React from 'react'
import { Field } from 'redux-form'

import { Button, Input } from 'components'

const SignUpForm = (props) => {

  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text" placeholder="Username" component={Input} />
      <Field name="password" type="password" placeholder="Password" component={Input} />
      <Field name="passwordRepeat" type="password" placeholder="Confirm Password" component={Input} />
      <Button type="submit">Sign Up</Button>
    </form>
  )
}

export default SignUpForm
