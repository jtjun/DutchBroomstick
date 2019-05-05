import React from 'react'
import { Field } from 'redux-form'

const UserInfoForm = (props) => {

  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text" placeholder="Username" component="input" />
      <Field name="credit" type="text" placeholder="Credit" component="input" />
      <Field name="password" type="password" placeholder="Password" component="input" />
      <Field name="passwordRepeat" type="password" placeholder="PasswordRepeat" component="input" />
      <button type="submit">변경</button>
    </form>
  )
}

export default UserInfoForm