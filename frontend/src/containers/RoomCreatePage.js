import React from 'react'
import { connect } from 'react-redux'
import { RoomCreatePage } from 'components'
import { Redirect } from 'react-router-dom'

const RoomCreatePageContainer = (props) => {
  const { username } = props

  if ( !username ) {
    return <Redirect to="/" />
  }
  else {
    return <RoomCreatePage {...props} />
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
  token: state.user.token,
})

export default connect(mapStateToProps)(RoomCreatePageContainer)
