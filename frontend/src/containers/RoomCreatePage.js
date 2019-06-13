import React from 'react'
import { connect } from 'react-redux'
import { RoomCreatePage } from 'components'
import { Redirect } from 'react-router-dom'

const RoomCreatePageContainer = (props) => {
  const { room, username } = props

  if ( !username ) {
    return <Redirect to="/" />
  }
  else if( room ) {
    return <Redirect to={`/room/${room.url}/`}/>
  } 
  else {
    return <RoomCreatePage {...props} />
  }
}

const mapStateToProps = state => ({
  room: state.room.room,
  username: state.user.username,
  token: state.user.token,
})

export default connect(mapStateToProps)(RoomCreatePageContainer)
