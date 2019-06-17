import React from 'react'
import { Field } from 'redux-form'
import { Button, Input } from 'components'

const UserInfoForm = (props) => {

  const { handleSubmit } = props
  console.log(props)

  return (
    <form onSubmit={handleSubmit}>
      <Field name="password" type="text" placeholder="password" component={Input} />
      <Field name="name" type="text" placeholder="name" component={Input} />
      <Field name="account" type="text" placeholder="account" component={Input} />
      <Button type="submit">변경</Button>
    </form>
  )
}

export default UserInfoForm