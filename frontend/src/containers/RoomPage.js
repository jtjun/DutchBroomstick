import React from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { RoomPage } from 'components'

import { roomGetRequest, roomLeave, roomSetMember, roomToggleContents } from 'store/actions'

class RoomPageContainer extends React.Component {
  componentDidMount() {
    const { match, room, onGetRoom } = this.props
    if (!room) {
      onGetRoom(match.params.room_id)
    }
  }

  render() {
    const { room, } = this.props
    
    if (room) {
      document.title = `${this.props.room.roomname} - Dutch Broomstick`
    }

    return <RoomPage {...this.props} />
  }

}

const mapStateToProps = state => ({
  room: state.room.room,
  members: state.member.members,
  payments: state.payment.payments,
  showPayment: state.room.showPayment,
})

const mapDispatchToProps = dispatch => ({
  onGetRoom: (url) => dispatch(roomGetRequest(url)),
  onLeave: () => dispatch(roomLeave()),
  onClickMember: (member, sendlist, getlist) => {
    dispatch(roomSetMember(member, sendlist, getlist))
    dispatch(push(`member/${member.id}/`))
  },
  onToggle: () => dispatch(roomToggleContents()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomPageContainer)
