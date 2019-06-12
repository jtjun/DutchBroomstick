import React from 'react'
import { connect } from 'react-redux'
import { RoomPage } from 'components'

import { roomGetRequest, roomLeave } from 'store/actions'

class RoomPageContainer extends React.Component {
  componentDidMount() {
    const { match, room, onGetRoom } = this.props
    if (!room) {
      onGetRoom(match.params.room_id)
    }
  }

  render() {
    if (this.props.room) {
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
  payments: state.room.payments,
})

const mapDispatchToProps = dispatch => ({
  onGetRoom: (url) => dispatch(roomGetRequest(url)),
  onLeave: () => dispatch(roomLeave())
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomPageContainer)
