import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { UserPage } from 'components'
import { userSignout, roomListRequest } from 'store/actions'

class UserPageContainer extends React.Component {
  componentDidMount() {
    const { username, token, roomList, onListRoom } = this.props
    if (roomList === null && username && token) {
      onListRoom(username, token)
    }
  }

  render() {
    const { signedIn } = this.props
  
    if (!signedIn) {
      return (
        <Redirect to="/" />
      )
    } else {
      return (
        <UserPage {...this.props} />
      )
    }
  }
}

const mapStateToProps = state => ({
  signedIn: state.user.signedIn,
  username: state.user.username,
  token: state.user.token,
  roomList: state.room.roomList,
})

const mapDispatchToProps = dispatch => ({
  onClickSignOut: () => dispatch(userSignout()),
  onListRoom: (username, token) => dispatch(roomListRequest(username, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPageContainer)
