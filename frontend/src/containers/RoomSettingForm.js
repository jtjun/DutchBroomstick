import React from 'react'
import { reduxForm } from 'redux-form'
import { RoomSettingForm } from 'components'

import { roomSettingRequest } from 'store/actions'

const RoomSettingFormContainer = props => {
    return (
      <RoomSettingForm {...props} />
    )
}

export default reduxForm({
    form: 'RoomSetting',
    onSubmit(values, dispatch) {
        dispatch(roomSettingRequest())
    }
})(RoomSettingFormContainer)
