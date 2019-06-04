import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { SignUpPage } from 'components'


const SignUpPageContainer = props => {
  const { signedIn } = props

  if (signedIn) {
    return <Redirect to={`/user/`} />
  }
  return (
    <SignUpPage {...props} />
  )
}

const mapStateToProps = state => ({
  signedIn: state.user.signedIn,
  username: state.user.username,
})

export default connect(mapStateToProps)(SignUpPageContainer)
