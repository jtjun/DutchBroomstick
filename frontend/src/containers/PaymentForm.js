import React from 'react'
import { reduxForm } from 'redux-form'

import { PaymentForm } from 'components'

const PaymentReduxForm = reduxForm({
  form: 'payment',
  onSubmit(values, dispatch) {
    console.log(values)
  }
})(PaymentForm)

const PaymentFormContainer = ({...props}) => {
  const initialValues = {
    credits: props.members.map(
      ({ membername }) => ({ membername, amount: 0.0 })
    )
  } 

  return (
    <PaymentReduxForm
      initialValues={initialValues}
      {...props}
    />
  )
}

export default PaymentFormContainer
