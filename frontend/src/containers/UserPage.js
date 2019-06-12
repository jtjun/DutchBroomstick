import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { UserPage } from 'components'
import { userSignout, roomListRequest, roomLeave } from 'store/actions'

class UserPageContainer extends React.Component {
  componentDidMount() {
    const { username, token, roomList, onListRoom, resetRoom } = this.props
    
    resetRoom()  // set state.room.room to null
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
  resetRoom: () => dispatch(roomLeave()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPageContainer)
