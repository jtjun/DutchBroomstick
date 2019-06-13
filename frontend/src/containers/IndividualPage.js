import React from 'react'
import { connect } from 'react-redux'
import { IndividualPage } from 'components'
import { Redirect } from 'react-router-dom'

const IndividualPageContainer = (props) => {
  
  if( !props.roomname ){
    return(
        <Redirect to="/" />
    )
  }
  else if( !props.nickname ){
    return(
      <Redirect to={`/room/${props.roomurl}`}/>
    )
  } 
  else {
    return (
      <IndividualPage {...props} />
    )
  }

}

const mapStateToProps = (state) => ({
    
    nickname : state.room.member.membername,
    roomname : state.room.room.roomname,
    
    //need to change after make payment states
    //IndividualPage need two lists, sendmoneylist & getmoneylist
    paymentlist : state.payment.paymentlist,
    roomurl : state.room.room.url
})

export default connect(mapStateToProps)(IndividualPageContainer)