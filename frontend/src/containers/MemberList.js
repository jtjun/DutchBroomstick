import React from 'react'
import { connect } from 'react-redux'

import { MemberList } from 'components'
import { memberCreateRequest } from 'store/actions'

const MemberListWrapper = ({ members, roomUrl, token }) => {
  const onCreateMember = (value, dispatch) => {
    dispatch(memberCreateRequest(token, roomUrl, value))
  }
  return (<MemberList members={members} onCreateMember={onCreateMember} />)
}

const mapStateToProps = state => ({
  members: state.member.members,
  roomUrl: state.room.room.url,
  token: state.user.token,
})

export default connect(mapStateToProps)(MemberListWrapper)
