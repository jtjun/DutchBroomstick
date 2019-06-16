import React from 'react'
import { connect } from 'react-redux'

import { PaymentPage } from 'components'

const PaymentPageContainer = props => {
  return <PaymentPage {...props} />
}

const mapStateToProps = state => ({
  room: state.room.room,
  payment: state.payment.payment,
})

export default connect(mapStateToProps)(PaymentPageContainer)

