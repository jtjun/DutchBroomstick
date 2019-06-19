import React from 'react'
import { connect } from 'react-redux'

import { PaymentPage } from 'components'

const PaymentPageContainer = ({ match, payments, ...props }) => {
  const paymentId = parseInt(match.params.payment_id)
  const payment = payments.find(p => p.id === paymentId)
  return <PaymentPage payment={payment} {...props} />
}

const mapStateToProps = state => ({
  room: state.room.room,
  members: state.member.members,
  payments: state.payment.payments,
})

export default connect(mapStateToProps)(PaymentPageContainer)

