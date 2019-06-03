import React from 'react'
import { connect } from 'react-redux'
import { RoomCreatePage } from 'components'
import { Redirect } from 'react-router-dom'

const RoomCreatePageContainer = (props) => {
  const { room } = props
  
  if( room ){
    return(
      <Redirect to={`/room/${room.roomname}/`}/>
    )
  } 
  else {
    return (
      <RoomCreatePage {...props} />
    )
  }
}

const mapStateToProps = state => ({
  room: state.room.roomname,
  username: state.user.username,
  token: state.user.token,
})

export default connect(mapStateToProps)(RoomCreatePageContainer)
