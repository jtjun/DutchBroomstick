import React from 'react'
import { Field } from 'redux-form'
import { Button, Input } from 'components'

const UserInfoForm = (props) => {

  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field name="password" type="text" placeholder="password" component={Input} />
      <Field name="default_nickname" type="text" placeholder="name" component={Input} />
      <Field name="default_account" type="text" placeholder="account" component={Input} />
      <Button type="submit">변경</Button>
    </form>
  )
}

export default UserInfoForm