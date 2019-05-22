import React from 'react'
import { connect } from 'react-redux'

const UserInfoPageContainer = (props) => {
  return <UserInfoPage {...props} />
}

const mapStateToProps = () => ({

})

export default connect(mapStateToProps)(UserInfoPageContainer)
