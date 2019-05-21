import React from 'react'
import { connect } from 'react-redux'
import { RoomCreatePage } from 'components'

const RoomCreatePageContainer = (props) => {
  const { roomname } = props
  if( !roomname ){
    return(
      <Redirect to="/"/>
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
