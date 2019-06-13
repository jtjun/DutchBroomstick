import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { RoomPage } from 'components'

import { roomGetRequest, roomLeave, roomSetMember } from 'store/actions'

class RoomPageContainer extends React.Component {
  componentDidMount() {
    const { match, room, onGetRoom } = this.props
    if (!room) {
      onGetRoom(match.params.room_id)
    }
  }

  render() {
    const { room, member } = this.props

    if (member) {
      return <Redirect to={`/room/${room.url}/${member.id}/`} />
    }
    
    if (room) {
      document.title = `${this.props.room.roomname} - Dutch Broomstick`
    }

    return <RoomPage {...this.props} />
  }

  componentWillUnmount() {
    this.props.onLeave()
  }
}

const mapStateToProps = state => ({
  room: state.room.room,
  member: state.room.member,
  payments: state.room.payments,
})

const mapDispatchToProps = dispatch => ({
  onGetRoom: (url) => dispatch(roomGetRequest(url)),
  onLeave: () => dispatch(roomLeave()),
  onClickMember: member => dispatch(roomSetMember(member)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomPageContainer)
