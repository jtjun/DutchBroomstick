import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector, change } from 'redux-form'

import { PaymentForm } from 'components'

const FORM_NAME = 'payment'

const PaymentReduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit(values, dispatch) {
    console.log(values)
  }
})(PaymentForm)

const selector = formValueSelector(FORM_NAME)

const mapStateToProps = state => ({
  total: selector(state, 'total') || 0,
  amountLeft: (() => {
    const total = selector(state, 'total') || 0
    const credits = selector(state, 'credits')
    return total - ((
      credits &&
      credits.map(credit => credit.amount).reduce(
        (a, b) => (a + b), 0
      )
    ) || 0)
  })(),
})

const mapDispatchToProps = dispatch => ({
  nBbang(total, members) {
    const amount = total / members.length
    members.forEach(
      (m, index) => 
      dispatch(change(FORM_NAME, `credits[${index}].amount`, amount))
    )
  }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentFormContainer)
