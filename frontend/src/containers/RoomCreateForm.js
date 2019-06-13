import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector, arrayPush, change } from 'redux-form'
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
  users: selector(state, 'users'),
})

const mapDispatchToProps = dispatch => ({
  pushMember: value => dispatch(arrayPush(FORM_NAME, 'users', value)),
  resetField: field => dispatch(change(FORM_NAME, field, null)),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: FORM_NAME,
    onSubmit(values, dispatch, props) {
      const { roomname, usernames } = values
      const { username, token } = props  // username means ownername
      dispatch(roomCreateRequest(roomname, usernames, username, token))
    }
  })(RoomCreateFormContainer)
)
