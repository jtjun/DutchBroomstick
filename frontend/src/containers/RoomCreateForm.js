import React from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { reduxForm, formValueSelector, arrayPush, change, SubmissionError } from 'redux-form'
import { RoomCreateForm } from 'components'

import { roomCreateRequest } from 'store/actions'

const FORM_NAME = "RoomCreate"

const RoomCreateFormContainer = props => {
  return (
    <RoomCreateForm {...props} />
  )
}

/* https://redux-form.com/8.2.2/examples/selectingformvalues/ */
const selector = formValueSelector(FORM_NAME)

const mapStateToProps = state => ({
  username: state.user.username,
  newMemberName: selector(state, 'newMemberName'),
  members: selector(state, 'members'),
})

const mapDispatchToProps = dispatch => ({
  pushMember: value => dispatch(arrayPush(FORM_NAME, 'members', value)),
  resetField: field => dispatch(change(FORM_NAME, field, null)),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: FORM_NAME,
    onSubmit(values, dispatch, props) {
      const { roomname, members } = values
      const { username, token } = props  // username means ownername

      if (!(members && members.length)) {
        toastr.light(
          "방 생성 오류", "화면 하단에서 다른 멤버를 최소 1명 추가해주세요.",
          { icon: 'error', status: 'error' }
        )
        return
      }
      dispatch(roomCreateRequest(roomname, members, username, token))
    }
  })(RoomCreateFormContainer)
)
