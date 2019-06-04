import React from 'react'
import { connect } from 'react-redux'
import { RoomSettingPage } from 'components'
import { Redirect } from 'react-router-dom'

const RoomSettingPageContainer = (props) => {
  
  
  if( !props.roomname ){
    return(
      <Redirect to="/user/"/>
    )
  } 
  else {
    return (
      <RoomSettingPage {...props} />
    )
  }


}

const mapStateToProps = (state) => ({
    roomname : state.room.room.roomname,
})

export default connect(mapStateToProps)(RoomSettingPageContainer)