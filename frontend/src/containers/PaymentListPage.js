import React from 'react'
import { connect } from 'react-redux'
import { PaymentListPage } from 'components'
import { Redirect } from 'react-router-dom'

const PaymentListPageContainer = (props) => {
  
  
  if( !props.roomname ){
    return(
      <Redirect to="/user/"/>
    )
  } 
  else {
    return (
      <PaymentListPage {...props} />
    )
  }

}

const mapStateToProps = (state) => ({
    username : state.username,
    roomname : state.roomname,
    paymentlist : state.paymentlist
})

export default connect(mapStateToProps)(PaymentListPageContainer)