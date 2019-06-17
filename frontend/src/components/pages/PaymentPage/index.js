import React from 'react'
import { Link } from 'react-router-dom'

import { Block, Button, Header, Input } from 'components'
import { PaymentForm } from 'containers'

const PaymentPage = ({ ...props, }) => (
  <div>
    <Header />
    <PaymentForm {...props} />
  </div>
)

export default PaymentPage
