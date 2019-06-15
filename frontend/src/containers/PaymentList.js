import React from 'react'
import { connect } from 'react-redux'
import { PaymentList } from 'components'
import { Redirect } from 'react-router-dom'

const PaymentListContainer = (props) => {
  
  
  if( !props.roomname ){
    return(
      <Redirect to="/user/"/>
    )
  } 
  else {
    return (
      <PaymentList {...props} />
    )
  }

}

const mapStateToProps = (state) => ({
    username : state.user.username,
    roomname : state.room.room.roomname,
    paymentlist : state.payment.paymentlist,
    roomurl : state.room.room.url,
})

export default connect(mapStateToProps)(PaymentListContainer)