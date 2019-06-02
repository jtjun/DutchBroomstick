import React from 'react'
import { connect } from 'react-redux'
import { RoomCreatePage } from 'components'
import { Redirect } from 'react-router-dom'

const RoomCreatePageContainer = (props) => {
  const { roomname } = props
  
  if( roomname ){
    return(
      <Redirect to={`/room/${roomname}/`}/>
    )
  } 
  else {
    return (
      <RoomCreatePage {...props} />
    )
  }
}

const mapStateToProps = () => ({

})

export default connect(mapStateToProps)(RoomCreatePageContainer)
