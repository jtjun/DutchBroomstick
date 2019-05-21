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
    onSubmit(values, dispatch) {
        dispatch(roomCreateRequest(values.roomname, values.usernames))
    }
})(RoomCreateFormContainer)
