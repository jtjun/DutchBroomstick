import React from 'react'
import { reduxForm } from 'redux-form'
import { UserInfoForm } from 'components'

import { userInfoChangeRequest } from 'store/actions'

const UserInfoFormContainer = props => {
    return (
      <UserInfoForm {...props} />
    )
}


export default reduxForm({
    form: 'UserInfoChange',
    onSubmit(values, dispatch) {
        // username을 change 가능? & 계좌내역도 가능하게 해야하나?
        dispatch(userInfoChangeRequest(values.username, values.password, values.passwordRepeat))
    }
})(UserInfoFormContainer)