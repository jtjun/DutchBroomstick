import React from 'react'
import { reduxForm } from 'redux-form'
import { RoomCreateForm } from 'components'

import { roomCreateRequest } from 'store/actions'

const RoomCreateFormContainer = props => {
    return (
      <RoomCreateForm {...props} />
    )
}

export default reduxForm({
    form: 'RoomCreate',
    onSubmit(values, dispatch, props) {
        const { roomname, usernames } = values
        const { username, token } = props  // username means ownername
        dispatch(roomCreateRequest(roomname, usernames, username, token))
    }
})(RoomCreateFormContainer)
