import React from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { reduxForm, formValueSelector, change, SubmissionError } from 'redux-form'

import { PaymentForm } from 'components'
import { paymentCreateRequest } from 'store/actions'

const FORM_NAME = 'payment'

const PaymentReduxForm = reduxForm({
  form: FORM_NAME,
  onSubmit(values, dispatch) {
    const { room, ...payment } = values
    const validationError = message => {
      toastr.light(
        "결제 추가 오류", message,
        { icon: 'error', status: 'error' }
      )
      throw new SubmissionError({ _error: message})
    }

    if (payment.total !== payment.credits.map(c => c.amount).reduce((a,b)=>(a+b),0)) {
      validationError("남은 돈이 0이 아닙니다!")
    }

    dispatch(paymentCreateRequest(room, payment))
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

const PaymentFormContainer = ({payment, ...props}) => {
  const initialValues = (payment ? 
    {  // if payment exists
      ...payment,
      room: props.room,
    } :
    {  // if payment doesn't exist
      credits: props.members.map(
        ({ membername }) => ({ toWho: membername, amount: 0.0 })
      ),
      room: props.room,
    }
  )

  console.log(initialValues)

  return (
    <PaymentReduxForm
      disabled={!!payment}
      initialValues={initialValues}
      {...props}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentFormContainer)
