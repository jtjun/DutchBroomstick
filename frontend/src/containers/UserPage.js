import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { UserPage } from 'components'
import { userSignout } from 'store/actions'

const UserPageContainer = props => {
  const { signedIn } = props
  
  if (!signedIn) {
    return (
      <Redirect to="/" />
    )
  } else {
    return (
      <UserPage {...props} />
    )
  }
}

const mapStateToProps = state => ({
  signedIn: state.user.signedIn,
  username: state.user.username,
})

const mapDispatchToProps = dispatch => ({
  onClickSignOut: () => dispatch(userSignout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPageContainer)
