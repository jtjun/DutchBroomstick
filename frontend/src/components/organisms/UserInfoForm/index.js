import React from 'react'
import { Field } from 'redux-form'
import { Button, Input } from 'components'

const UserInfoForm = (props) => {

  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text" placeholder="Username" component={Input} />
      {/*<Field name="credit" type="text" placeholder="Credit" component={Input} />*/}
      <Field name="password" type="password" placeholder="Password" component={Input} />
      <Field name="passwordRepeat" type="password" placeholder="PasswordRepeat" component={Input} />
      <Button type="submit">변경</Button>
    </form>
  )
}

export default UserInfoForm