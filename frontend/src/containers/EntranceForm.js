import React from 'react'
import { reduxForm } from 'redux-form'
import { EntranceForm } from 'components'

import { entranceRequest } from 'store/actions'

const EntranceFormContainer = props => {
    return (
      <EntranceForm {...props} />
    )
}


export default reduxForm({
    form: 'Entrance',
    onSubmit(values, dispatch) {
        dispatch(entranceRequest())
    }
})(EntranceFormContainer)
