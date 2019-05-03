import React from 'react'
import { reduxForm } from 'redux-form'
import { SignUpForm } from 'components'

import { userSignUpRequest } from 'store/actions'

const SignUpFormContainer = props => {
    return (
      <SignUpForm {...props} />
    )
}


export default reduxForm({
    form: 'SignUp',
    onSubmit(values, dispatch) {
        dispatch(userSignUpRequest(values.username, values.password, values.passwordRepeat))
    }
})(SignUpFormContainer)
