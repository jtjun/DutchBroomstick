import React from 'react'
import { connect } from 'react-redux'
import { AccountPage } from 'components'
import { Redirect } from 'react-router-dom'

const AccountPageContainer = (props) => {

    /*
  
  if( !props.roomname ){
    return(
        <Redirect to="/" />
    )
  }
  else if( !props.toname ){
    return(
      <Redirect to={`/room/${props.roomname}`}/>
    )
  } 
  else {
    return (
      <AccountPage {...props} />
    )
  }
  */

  return (
      <AccountPage {...props} />
  )

}

const mapStateToProps = (state) => ({
    
    roomname : state.room.room.roomname,

    toname : state.payment.senddata.to,
    money : state.payment.senddata.label,
    account : state.payment.account,

})

export default connect(mapStateToProps)(AccountPageContainer)