import React from 'react'
import { connect } from 'react-redux'

import { UserInfoPage } from 'components'

const UserInfoPageContainer = (props) => {
  return <UserInfoPage {...props} />
}

const mapStateToProps = () => ({

})

export default connect(mapStateToProps)(UserInfoPageContainer)
